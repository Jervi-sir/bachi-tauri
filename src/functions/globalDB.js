import { documentDir } from '@tauri-apps/api/path';
const documentDirPath = await documentDir();
import Database from "tauri-plugin-sql-api";

export async function connect() {
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