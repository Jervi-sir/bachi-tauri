import { connect } from './globalDB'
/*
 |-----------------------
 | Chantier Section
 |-----------------------
*/
export async function insertChantier(name, location) {
  const db = await connect();
  let today = new Date().toLocaleDateString()
  await db.execute("INSERT INTO chantiers ('name', 'location', 'created_at') VALUES (?1, ?2, ?3)", [name, location, today]);
}

export async function allChantier() {
  const db = await connect();
  const rows = await db.select("SELECT * FROM chantiers");
  return rows;
}

export async function updateChantier(id, name, location) {
  const db = await connect();
  await db.execute("UPDATE chantiers SET name = ?2, location = ?3 WHERE id = ?1", [id, name, location]);
}

export async function getChantier(id) {
  const db = await connect();
  const row = await db.select("SELECT * FROM chantiers WHERE id = ?1", [id]);
  console.log(row)
  return row;
}

export async function listChantier() {
  const db = await connect();
  const rows = await db.select("SELECT id, name FROM chantiers");
  return rows;
}


export async function addWorkerToChantier(worker_id, chantier_id) {
  const db = await connect();
  let today = new Date().toLocaleDateString();
  //let chantier = await db.select("SELECT * FROM chantiers WHERE id = ?1", [chantier_id]);
  //await db.execute("UPDATE chantiers SET nb_workers = ?2 WHERE id = ?1", [chantier_id, chantier[0].nb_workers + 1]);
  //TODO verify if id worker and id chantier exists
  await db.execute("INSERT INTO worker_chantiers ('worker_id', 'chantier_id', 'created_at') VALUES (?1, ?2, ?3)", [worker_id, chantier_id, today]);
  let chantier_workers = await db.select("SELECT * FROM worker_chantiers WHERE chantier_id = ?1", [chantier_id]);
  console.log(chantier_workers.length)
  await db.execute("UPDATE chantiers SET nb_workers = ?2 WHERE id = ?1", [chantier_id, chantier_workers.length]);

}

export async function getTotalInvestChantier(chantier_id) {
  const db = await connect();
  let rows = await db.select("SELECT total_invested, total_spent FROM today_chantiers WHERE chantier_id = ?1", [chantier_id]);
  
  if(rows.length != 0) {
    var total_invested = rows.map(row => row.total_invested).reduce((acc, row) => row + acc);
    var total_spent = rows.map(row => row.total_spent).reduce((acc, row) => row + acc);
  } else {
    var total_invested = 0;
    var total_spent = 0;
  }
  return {
    'total_invested': total_invested,
    'total_spent': total_spent,
  };
}

export async function getNbWorkersChantier(chantier_id) {
  const db = await connect();
  let rows = await db.select("SELECT * FROM worker_chantiers WHERE chantier_id = ?1", [chantier_id]);
  return rows.length;
}

export async function get_joinedWorkers_and_notJoinedWorkers(chantier_id) {
  const db = await connect();
  let joinedWorkers = await db.select("SELECT * FROM workers w JOIN worker_chantiers wc ON wc.worker_id = w.id  WHERE wc.chantier_id = ?1", [chantier_id]);
  let notJoined = await db.select("SELECT * FROM workers joined WHERE id NOT IN (SELECT w.id FROM workers w JOIN worker_chantiers wc ON wc.worker_id = w.id  WHERE wc.chantier_id = ?1)", [chantier_id]);
  return {
    'joined': joinedWorkers,
    'notJoined': notJoined,
  };
}

export async function excludeWorkerFromChantier(deal_id) {
  const db = await connect();
  let chantier_id = await db.select("SELECT chantier_id FROM worker_chantiers WHERE id = ?1", [deal_id]);
  let chantier_workers = await db.select("SELECT * FROM worker_chantiers WHERE chantier_id = ?1", [chantier_id[0].chantier_id]);
  await db.execute("DELETE FROM worker_chantiers WHERE id = ?1", [deal_id]);
  await db.execute("UPDATE chantiers SET nb_workers = ?2 WHERE id = ?1", [chantier_id[0].chantier_id, chantier_workers.length]);
}

export async function updateChantierAmount(amount, id) {
  const db = await connect();
  await db.execute("UPDATE today_chantiers SET total_invested = ?1 WHERE id = ?2 ", [amount, id]);
  let resultDB = await db.select("SELECT * FROM today_chantiers WHERE id = ?1", [id]);
  console.log(resultDB[0]);
  return resultDB[0];
}

/*--- NOW USED ---*/
export async function getWorkersChantier(chantier_id) {
  const db = await connect();
  const rows = await db.select("SELECT w.* FROM chantiers c JOIN worker_chantiers wc ON c.id = wc.chantier_id JOIN workers w ON wc.worker_id = w.id WHERE wc.chantier_id = ?1", [chantier_id])
  return rows; 
}
