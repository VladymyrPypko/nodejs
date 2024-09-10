import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { Item } from '../models/Item.interface';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb(): Promise<void> {
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

export async function createItem(
  name: string,
  description: string
): Promise<number> {
  const result = await db.run(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    name,
    description
  );
  return result.lastID ?? 0;
}

export async function getAllItems(): Promise<Item[]> {
  return await db.all('SELECT * FROM items');
}

export async function getItemById(id: number): Promise<Item | undefined> {
  return await db.get('SELECT * FROM items WHERE id = ?', id);
}

export async function updateItem(
  id: number,
  name: string,
  description: string
): Promise<void> {
  await db.run(
    'UPDATE items SET name = ?, description = ? WHERE id = ?',
    name,
    description,
    id
  );
}

export async function deleteItem(id: number): Promise<void> {
  await db.run('DELETE FROM items WHERE id = ?', id);
}
