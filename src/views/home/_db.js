import { connect } from '../../functions/globalDB';
/*----------
| Home
----------*/
/* used_in = ['addworker.vue'] -*/
export async function getWorkersNotInChantier(chantier_id) {
  const db = await connect();
  let notJoined = await db.select("SELECT * FROM workers joined WHERE id NOT IN (SELECT w.id FROM workers w JOIN worker_chantiers wc ON wc.worker_id = w.id  WHERE wc.chantier_id = ?1)", [chantier_id]);
  console.log(notJoined);
  return notJoined;
}

/* used_in = ['AddWorker.vue'] -*/
export async function addWorkerToChantierFromTodayChantier(worker_id, today_chantier) {
  const db = await connect();
  let today = new Date().toLocaleDateString();  // MM/DD/YYYY
  console.log(worker_id, today_chantier)
  //add it to worker_chantier
  await db.execute("INSERT INTO worker_chantiers (worker_id, chantier_id, created_at) VALUES (?1, ?2, ?3) ", 
            [worker_id, today_chantier.chantier_id, today]);

  //add it to today_work
  await db.execute("INSERT INTO today_works (worker_id, chantier_id, today_chantier_id, created_at) VALUES (?1, ?2, ?3, ?4)",
                    [worker_id, today_chantier.chantier_id, today_chantier.id, today_chantier.created_at]);

}

/* used_in = ['AddWorker.vue'] -*/
export async function getTodayWorkOfChantier(chantier_id) {
  const db = await connect();

  //get today date formatted
  let today = new Date().toLocaleDateString();  // MM/DD/YYYY

  //check if chantier stats of today was already created
  let today_chantier = await db.select("SELECT * FROM today_chantiers WHERE chantier_id = ?2 AND today_date = ?1", 
                                      [today, chantier_id])
  let today_chantier_id = null;
  //search in today_chantier if exists, if doesnt, then create new one
  if(today_chantier.length == 0) {  
    //create today_chantier
    today_chantier = await db.execute("INSERT INTO today_chantiers (chantier_id, today_date, created_at) VALUES (?1, ?2, ?3)",
                                    [chantier_id, today, today]);
    today_chantier_id = today_chantier.lastInsertId;
    //get worker ids of chantier
    var worker_ids = await db.select("SELECT worker_id FROM worker_chantiers WHERE chantier_id = ?1", [chantier_id]);
    //insert workers in today stats chantier aka today_works
    for(var i = 0; i < worker_ids.length; i++) {
      await db.execute("INSERT INTO today_works (worker_id, chantier_id, today_chantier_id, created_at) VALUES (?1, ?2, ?3, ?4)",
                    [parseInt(worker_ids[i].worker_id), chantier_id, today_chantier_id, today]);
    }
  }  else {
    today_chantier_id = today_chantier[0].id;
  }
  //get list of today_works
  var result_workers = await db.select("SELECT tw.id AS today_worker_id, * FROM today_works tw  JOIN workers w ON w.id = tw.worker_id WHERE tw.chantier_id = ?1 AND tw.today_chantier_id = ?2", [chantier_id, today_chantier_id]);
  return {
    'chantier': today_chantier,
    'workers': result_workers
  }

}

/* used_in = ['AddWorker.vue'] -*/
export async function listChantier() {
  const db = await connect();
  const rows = await db.select("SELECT id, name FROM chantiers");
  return rows;
}

/* used_in = ['AddWorker.vue'] -*/
export async function updateChantierAmount(amount, id) {
  const db = await connect();
  await db.execute("UPDATE today_chantiers SET total_invested = ?1 WHERE id = ?2 ", [amount, id]);
  let resultDB = await db.select("SELECT * FROM today_chantiers WHERE id = ?1", [id]);
  console.log(resultDB[0]);
  return resultDB[0];
}

/* used_in = ['UserRow.vue'] -*/
export async function saveTodayWorkerWork(today_worker_id, today_chantier_id, is_absent, revenue, hour_worked) {
  const db = await connect();
  //get worker old revenue and apply on it new revenue
  let worker_today_work = await db.select("SELECT * FROM today_works WHERE id = ?1", [today_worker_id]);
  //save new revenue to today work
  await db.execute("UPDATE today_works SET is_absent = ?2, revenue = ?3, hour_worked = ?4 WHERE id = ?1",
            [today_worker_id, is_absent, revenue, hour_worked]);
  //update today_chantier spent amount
  //get chantier_id and today_date from today_works with today_chantier_id
  let today_chantierDB = await db.select("SELECT * FROM today_works WHERE chantier_id = ?1 AND today_chantier_id = ?2",
            [worker_today_work[0].chantier_id, worker_today_work[0].today_chantier_id]);
  //sum of all revenues
  var total_spent = today_chantierDB.map(item => item.revenue).reduce((acc, item) => parseInt(item) + parseInt(acc));
  //update chanteir today spent money
  await db.execute("UPDATE today_chantiers SET total_spent= ?1 WHERE id = ?2", [total_spent, today_chantier_id]);
  return {
    'total_spent': total_spent
  }
}





