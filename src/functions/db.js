import SQLite from 'tauri-plugin-sqlite-api'
import { documentDir } from '@tauri-apps/api/path';
const documentDirPath = await documentDir();

async function connect() {
  const db = await SQLite.open(documentDirPath + '/test.db')
  return db;
}

export async function createTables() {
  const db = await connect();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS chantiers (
      chantier_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      location TEXT,
      created_at DATE
    ); 
    CREATE TABLE IF NOT EXISTS workers (
      worker_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, 
      birthday DATE,
      phone_number TEXT,
      position TEXT,
      chantier_id INTEGER,
      created_at DATE,
      FOREIGN KEY(chantier_id) REFERENCES chantiers(chantier_id)
    );  
    CREATE TABLE IF NOT EXISTS worker_chantiers(
      worker_chantier_id INTEGER PRIMARY KEY AUTOINCREMENT,
      worker_id INTEGER,
      chantier_id INTEGER,
      created_at DATE,
      FOREIGN KEY(chantier_id) REFERENCES workers(worker_id),
      FOREIGN KEY(worker_id) REFERENCES chantiers(chantier_id)
    );
    CREATE TABLE IF NOT EXISTS todays(
      today_id INTEGER PRIMARY KEY AUTOINCREMENT,
      chantier_id TEXT,
      today_date DATE,
      total_invested TEXT,
      total_spent TEXT,
      created_at DATE,
      FOREIGN KEY(today_id) REFERENCES chantiers(chantier_id)
    );
    CREATE TABLE IF NOT EXISTS today_works (
      today_work_id INTEGER PRIMARY KEY AUTOINCREMENT,
      worker_id INTEGER,
      chantier_id INTEGER,
      today_id INTEGER,
      is_absent BOOL,
      revenue TEXT,
      hour_worked TEXT,
      created_at DATE,
      FOREIGN KEY(chantier_id) REFERENCES chantiers(chantier_id),
      FOREIGN KEY(worker_id) REFERENCES workers(worker_id),
      FOREIGN KEY(today_id) REFERENCES todays(today_id)
    );
  `)
}

export async function insertChantier(name, location) {
  const db = await connect();
  let today = new Date().toLocaleDateString()
  await db.execute("INSERT INTO chantiers ('name', 'location', 'created_at') VALUES (?1, ?2, ?3)", [name, location, today]);
}

export async function allChantier() {
  const db = await connect();
  const rows = await db.select('SELECT * FROM chantiers')
  return rows;
}

export async function updateChantier(id, name, location) {
  const db = await connect();
  await db.execute("UPDATE chantiers SET name = ?2, location = ?3 WHERE chantier_id = ?1", [id, name, location]);
}

export async function getChantier(id) {
  const db = await connect();
  const row = await db.select("SELECT * FROM chantiers WHERE chantier_id = ?1", [id]);
  return row;
}