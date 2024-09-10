import express, { Request, Response } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from '../services/dbServices';

const router = express.Router();

router.post('/items', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const id = await createItem(name, description);
    res.json({ id, name, description });
  } catch (error) {
    res.status(500).send('Failed to create item');
  }
});

router.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).send('Failed to get items');
  }
});

router.get('/items/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Incorrect ID');
  }

  try {
    const item = await getItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).send('Failed to get item');
  }
});

router.put('/items/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Incorrect ID');
  }

  const { name, description } = req.body;

  try {
    await updateItem(id, name, description);
    res.send('Item updated');
  } catch (error) {
    res.status(500).send('Failed to update item');
  }
});

router.delete('/items/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Incorrect ID');
  }

  try {
    await deleteItem(id);
    res.send('Item deleted');
  } catch (error) {
    res.status(500).send('Failed to delete item');
  }
});

export default router;
