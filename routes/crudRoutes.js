import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../services/dbService.js';

const router = express.Router();

router.post('/items', async (req, res) => {
  const { name, description } = req.body;
  const id = await createItem(name, description);
  res.status(201).json({ id, name, description });
});

router.get('/items', async (req, res) => {
  const items = await getAllItems();
  res.json(items);
});

router.get('/items/:id', async (req, res) => {
  const item = await getItemById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

router.put('/items/:id', async (req, res) => {
  const { name, description } = req.body;
  await updateItem(req.params.id, name, description);
  res.status(200).send('Item updated');
});

router.delete('/items/:id', async (req, res) => {
  await deleteItem(req.params.id);
  res.status(200).send('Item deleted');
});

export default router;
