
import {initSqlJs} from 'sql.js';

let dbInstance; // Hold the initialized database instance

export async function initializeDatabase() {
  if (dbInstance) return dbInstance; // Return the instance if already initialized

  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create a table
  db.run(`
    CREATE TABLE IF NOT EXISTS snippets (
      id TEXT PRIMARY KEY, 
      name TEXT, 
      content TEXT, 
      tag_id TEXT
    )
  `);
//   db.run(`
//     CREATE TABLE IF NOT EXISTS tags (
//       id INTEGER PRIMARY KEY AUTOINCREMENT, 
//       tag TEXT
//     )
//   `, (err) => {
//   if (err) { console.error(err.message) }
//   else { console.log("Done") }
// });

  dbInstance = db; // Store the instance for reuse
  return dbInstance;
}

// export default initializeDatabase;
