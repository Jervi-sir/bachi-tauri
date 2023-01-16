//import SQLite from 'tauri-plugin-sqlite-api'
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


/*
 |-----------------------
 | Today and worker and chantier Section
 |-----------------------
*/
export async function getTodayWorkOfChantier(chantier_id) {
  var chantier_id = 2;
  const db = await connect();

  //get today date formatted
  let today = new Date().toLocaleDateString();  // MM/DD/YYYY
  let today_chantier = await db.select("SELECT * FROM today_chantiers WHERE chantier_id = ?2 AND today_date = ?1", 
                                    [today, chantier_id])
  if(today_chantier.length == 0) {  //doesn't exist
    //create today_chantier
    today_chantier = await db.execute("INSERT INTO today_chantiers (chantier_id, today_date, created_at) VALUES (?1, ?2, ?3)",
                                    [chantier_id, today, today]);
  } else { //does exist 
    
  }
  console.log(today_chantier);
  //search in today_chantier if exists, if doesnt, then create new one
  //list workers for that chantier
  //join with today_work if the today_chantier was already existing
}


/*--
make function that create today's work for each chantier and current day

-*/