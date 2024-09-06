import express from 'express';
import { dbPromise } from './database.js';

const app = express();

app.use(express.json());

const createTables = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      age INTEGER
    )
  `);
};

createTables();

// CRUD operations

// Create operation
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    res.json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Read operation (all users)
app.get('/users', async (req, res) => {
  try {
    const db = await dbPromise;
    const users = await db.all('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Update
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const db = await dbPromise;
    await db.run('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [
      name,
      email,
      age,
      id,
    ]);
    res.json({ message: 'User data has been updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user data' });
  }
});

// Delete
app.delete('users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await dbPromise;
    await db.run('DELETE FROM users WHERE id = ?', [id]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
