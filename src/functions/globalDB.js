import { documentDir } from '@tauri-apps/api/path';
const documentDirPath = await documentDir();
import Database from "tauri-plugin-sql-api";

export async function connect() {
  const db = await Database.load('sqlite:' + documentDirPath + '/ChantiersManager.db')
  return db;
}

export async function createTables() {
  const db = await connect();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS chantiers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      location TEXT,
      nb_workers INTEGER DEFAULT 0,
      created_at DATE
    ); 
    CREATE TABLE IF NOT EXISTS workers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, 
      birthday TEXT,
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
      today_date TEXT,
      total_invested TEXT DEFAULT 0,
      total_spent TEXT DEFAULT 0,
      created_at DATE,
      FOREIGN KEY(chantier_id) REFERENCES chantiers(id)
    );
    CREATE TABLE IF NOT EXISTS today_works (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      worker_id INTEGER,
      chantier_id INTEGER,
      today_chantier_id INTEGER,
      is_absent BOOL DEFAULT 0,
      revenue TEXT DEFAULT 0,
      hour_worked TEXT DEFAULT 0,
      created_at DATE,
      FOREIGN KEY(worker_id) REFERENCES workers(id),
      FOREIGN KEY(chantier_id) REFERENCES chantiers(id),
      FOREIGN KEY(today_chantier_id) REFERENCES today_chantiers(id)
    );
  `)
}