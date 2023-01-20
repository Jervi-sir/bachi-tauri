import { connect } from '../../functions/globalDB';
/*----------
| Worker
----------*/
/* used_in = ['index.vue'] -*/
export async function listChantier() {
  const db = await connect();
  const rows = await db.select("SELECT id, name FROM chantiers");
  return rows;
}

/* used_in = ['index.vue'] -*/
export async function statsOfChantierDay(today_chantier_id) {
  const db = await connect();
  let workers_chantier = await db.select("SELECT w.*, tw.* FROM today_works tw JOIN workers w ON tw.worker_id = w.id  WHERE tw.today_chantier_id = ?1",
                                [today_chantier_id]);
  let chantier_day_details = await db.select("SELECT * FROM today_chantiers WHERE id = ?1",
                                [today_chantier_id]);
  return {
    'workers_chantier': workers_chantier,
    'chantier_day_details': chantier_day_details,
  };
}

/* used_in = ['index.vue'] -*/
export async function statsOfChantier(chantier_id) {
  const db = await connect();

  let chantier = await db.select("SELECT * FROM chantiers WHERE id = ?1", 
                                [chantier_id]);
  let worker_chantier = await db.select("SELECT * FROM workers WHERE id IN (SELECT worker_id FROM worker_chantiers WHERE chantier_id = ?1)",
                                [chantier_id]);
  let chantier_days = await db.select("SELECT * FROM today_chantiers WHERE chantier_id = ?1 ORDER BY id DESC",
                                [chantier_id]);
  return {
    'chantier': chantier,
    'worker_chantier': worker_chantier,
    'chantier_days': chantier_days,
  }
}




























