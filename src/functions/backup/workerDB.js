import { connect } from './globalDB'
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
