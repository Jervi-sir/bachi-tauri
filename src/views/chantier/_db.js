import { connect } from '../../functions/globalDB';
/*----------
| Chantier
----------*/
/* used_in = ['add.vue'] -*/
export async function insertChantier(name, location) {
  const db = await connect();
  let today = new Date().toLocaleDateString()
  await db.execute("INSERT INTO chantiers ('name', 'location', 'created_at', 'nb_workers') VALUES (?1, ?2, ?3, ?4)", [name, location, today, 0]);
}

/* used_in = ['edit.vue', 'view.vue'] -*/
export async function getChantier(id) {
  const db = await connect();
  const row = await db.select("SELECT * FROM chantiers WHERE id = ?1", [id]);
  console.log(row)
  return row;
}
/* used_in = ['edit.vue'] -*/
export async function updateChantier(id, name, location) {
  const db = await connect();
  await db.execute("UPDATE chantiers SET name = ?2, location = ?3 WHERE id = ?1", [id, name, location]);
}

/* used_in = ['index.vue'] -*/
export async function allChantier() {
  const db = await connect();
  const rows = await db.select("SELECT * FROM chantiers");
  return rows;
}

/* used_in = ['view.vue'] -*/
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

/* used_in = ['view.vue'] -*/
export async function getNbWorkersChantier(chantier_id) {
  const db = await connect();
  let rows = await db.select("SELECT * FROM worker_chantiers WHERE chantier_id = ?1", [chantier_id]);
  return rows.length;
}

