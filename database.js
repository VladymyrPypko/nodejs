import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();

export const dbPromise = open({
  filename: process.env.DB_FILE || './database.sqlite',
  driver: sqlite3.Database,
});
