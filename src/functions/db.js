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
    CREATE TABLE IF NOT EXISTS workers (
      name TEXT, 
      birthday DATE,
      phone_number TEXT,
      place TEXT,
      position TEXT,
      chantier TEXT
    ); 
  `)
}

export async function insert() {
  await db.execute('INSERT INTO users VALUES (?1, ?2)', ['Jack', 18]);
}

