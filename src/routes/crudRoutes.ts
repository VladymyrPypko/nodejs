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
  const { name, description } = req.body;
  const id = await createItem(name, description);
  res.json({ id, name, description });
});

router.get('/items', async (req: Request, res: Response) => {
  const items = await getAllItems();
  res.json(items);
});

router.get('/items/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Incorrect ID');
  }

  const item = await getItemById(id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

router.put('/items/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Incorrect ID');
  }

  const { name, description } = req.body;
  await updateItem(id, name, description);
  res.send('Item updated');
});

router.delete('/items/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Incorrect ID');
  }
  await deleteItem(id);
  res.send('Item deleted');
});

export default router;
