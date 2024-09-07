import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db;

export async function initDb() {
  db = await open({
    filename: './data/database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    )
  `);
}

export async function createItem(name, description) {
  const result = await db.run(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    name,
    description
  );
  return result.lastID;
}

export async function getAllItems() {
  return await db.all('SELECT * FROM items');
}

export async function getItemById(id) {
  return await db.get('SELECT * FROM items WHERE id = ?', id);
}

export async function updateItem(id, name, description) {
  return await db.run(
    'UPDATE items SET name = ?, description = ? WHERE id = ?',
    name,
    description,
    id
  );
}

export async function deleteItem(id) {
  return await db.run('DELETE FROM items WHERE id = ?', id);
}
