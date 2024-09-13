import express from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from '../services/dbService.js';

const router = express.Router();

router.post('/items', async (req, res) => {
  try {
    const item = req.body;
    const newItem = await createItem(item);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error });
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error getting items', error: error });
  }
});

router.get('/items/:id', async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error getting item', error: error });
  }
});

router.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await updateItem(req.params.id, req.body);
    if (!updatedItem.value) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem.value);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await deleteItem(req.params.id);
    if (!deletedItem.value) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error });
  }
});

export default router;