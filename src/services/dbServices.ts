import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { Item } from '../models/Item.interface';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb(): Promise<void> {
  try {
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
  } catch (error) {
    console.error('Error initializing the database:', error);
    throw error;
  }
}

export async function createItem(
  name: string,
  description: string
): Promise<number> {
  try {
    const result = await db.run(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      name,
      description
    );

    if (result.lastID !== undefined) {
      return result.lastID;
    } else {
      throw new Error('Failed to retrieve lastID');
    }
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

export async function getAllItems(): Promise<Item[]> {
  try {
    return await db.all('SELECT * FROM items');
  } catch (error) {
    console.error('Error fetching all items:', error);
    throw error;
  }
}

export async function getItemById(id: number): Promise<Item | undefined> {
  try {
    return await db.get('SELECT * FROM items WHERE id = ?', id);
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    throw error;
  }
}

export async function updateItem(
  id: number,
  name: string,
  description: string
): Promise<void> {
  try {
    await db.run(
      'UPDATE items SET name = ?, description = ? WHERE id = ?',
      name,
      description,
      id
    );
  } catch (error) {
    console.error(`Error updating item with id: ${id}:`, error);
    throw error;
  }
}

export async function deleteItem(id: number): Promise<void> {
  try {
    await db.run('DELETE FROM items WHERE id = ?', id);
  } catch (error) {
    console.error(`Error deleting item with id: ${id}:`, error);
    throw error;
  }
}