import { documentDir } from '@tauri-apps/api/path';
const documentDirPath = await documentDir();
import Database from "tauri-plugin-sql-api";

async function connect() {
  const db = await Database.load('sqlite:' + documentDirPath + '/test.db')
  return db;
}

export async function createTables() {
  const db = await connect();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS chantiers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      location TEXT,
      created_at DATE
    ); 
    CREATE TABLE IF NOT EXISTS workers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, 
      birthday DATE,
      phone_number TEXT,
      position TEXT,
      location TEXT,
      created_at DATE
    );  
    CREATE TABLE IF NOT EXISTS worker_chantiers(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      worker_id INTEGER,
      chantier_id INTEGER,
      created_at DATE,
      FOREIGN KEY(worker_id) REFERENCES workers(id),
      FOREIGN KEY(chantier_id) REFERENCES chantiers(id)
    );
    CREATE TABLE IF NOT EXISTS today_chantiers(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chantier_id INTEGER,
      today_date DATE,
      total_invested TEXT,
      total_spent TEXT,
      created_at DATE,
      FOREIGN KEY(chantier_id) REFERENCES chantiers(id)
    );
    CREATE TABLE IF NOT EXISTS today_works (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      worker_id INTEGER,
      chantier_id INTEGER,
      today_chantier_id INTEGER,
      is_absent BOOL,
      revenue TEXT,
      hour_worked TEXT,
      created_at DATE,
      FOREIGN KEY(worker_id) REFERENCES workers(id),
      FOREIGN KEY(chantier_id) REFERENCES chantiers(id),
      FOREIGN KEY(today_chantier_id) REFERENCES today_chantiers(id)
    );
  `)
}
/*
 |-----------------------
 | Worker Section
 |-----------------------
*/
export async function insertWorker(name, birthday, phone_number, position, location) {
  const db = await connect();
  let today = new Date().toLocaleDateString()
  await db.execute("INSERT INTO workers ('name', 'birthday', 'phone_number', 'position', 'location', 'created_at') VALUES (?1, ?2, ?3, ?4, ?5, ?6)", 
      [name, birthday, phone_number, position, location, today]
    );
}

export async function allWorkers() {
  const db = await connect();
  const rows = await db.select('SELECT * FROM workers')
  return rows;
}

export async function updateWorker(id, name, birthday, phone_number, position, location) {
  const db = await connect();
  await db.execute("UPDATE workers SET name = ?2, birthday = ?3, phone_number = ?4, position = ?5, location = ?6 WHERE id = ?1", 
    [id, name, birthday, phone_number, position, location]
  );
}

export async function getWorker(id) {
  const db = await connect();
  const row = await db.select("SELECT * FROM workers WHERE id = ?1", [id]);
  return row;
}


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

export async function getWorkersChantier(chantier_id) {
  const db = await connect();
  const rows = await db.select("SELECT w.* FROM chantiers c JOIN worker_chantiers wc ON c.id = wc.chantier_id JOIN workers w ON wc.worker_id = w.id WHERE wc.chantier_id = ?1", [chantier_id])
  return rows; 
}

export async function addWorkerToChantier(worker_id, chantier_id) {
  const db = await connect();
  let today = new Date().toLocaleDateString();
  //TODO verify if id worker and id chantier exists
  await db.execute("INSERT INTO worker_chantiers ('worker_id', 'chantier_id', 'created_at') VALUES (?1, ?2, ?3)", [worker_id, chantier_id, today]);
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
  await db.execute("DELETE FROM worker_chantiers WHERE id = ?1", [deal_id]);
}

/*
 |-----------------------
 | Today and worker and chantier Section
 |-----------------------
*/

/*-new-*/
export async function getTodayWorkOfChantier(chantier_id) {
  const db = await connect();

  //get today date formatted
  let today = new Date().toLocaleDateString();  // MM/DD/YYYY

  //check if chantier stats of today was already created
  let today_chantier = await db.select("SELECT * FROM today_chantiers WHERE chantier_id = ?2 AND today_date = ?1", 
                                      [today, chantier_id])
  let today_chantier_id = today_chantier[0].id;

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
  } 

  //get list of today_works
  var result_workers = await db.select("SELECT * FROM today_works tw  JOIN workers w ON w.id = tw.worker_id WHERE tw.chantier_id = ?1 AND tw.today_chantier_id = ?2", [chantier_id, today_chantier_id]);
  return {
    'chantier': today_chantier,
    'workers': result_workers
  }

}

/*-old-*/
export async function getTodayWorkOfChantier_OLD(chantier_id) {
  const db = await connect();

  //get today date formatted
  let today = new Date().toLocaleDateString();  // MM/DD/YYYY
  let today_chantier = await db.select("SELECT * FROM today_chantiers WHERE chantier_id = ?2 AND today_date = ?1", 
                                    [today, chantier_id])
  //search in today_chantier if exists, if doesnt, then create new one
  if(today_chantier.length == 0) {  
    //create today_chantier
    today_chantier = await db.execute("INSERT INTO today_chantiers (chantier_id, today_date, created_at) VALUES (?1, ?2, ?3)",
                                    [chantier_id, today, today]);
  } 
  //list workers for that chantier joined with today_work 
  let workers_chantier = await db.select("SELECT w.*, tw.* FROM chantiers c JOIN worker_chantiers wc ON c.id = wc.chantier_id JOIN workers w ON wc.worker_id = w.id JOIN today_works tw ON tw.worker_id = w.id WHERE wc.chantier_id = ?1 AND tw.chantier_id = ?1", [chantier_id])
  
  return {
    'chantier': today_chantier,
    'workers': workers_chantier
  }
}

export async function saveTodayWorkerWork(worker_id, chantier_id, is_absent, revenue, hour_worked) {
  const db = await connect();
  await db.execute("UPDATE today_works SET is_absent = ?1, revenue = ?2, hour_worker = ?3 WHERE id = ?4");
}