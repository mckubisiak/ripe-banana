import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const studio = await Studio.create(req.body);
    console.log('STUDIO:', studio);
    console.log('REQ body', req.body);
    res.send(studio);
  } catch (error) {
    next(error);
  }
}) 
  .get('/:id', async (req, res, next) => {
    try {
      const studio = ({
        id: 1,
        name: 'Ghibli',
        city: 'Tokyo',
        state: 'Kanto',
        country: 'Japan',
      });
      res.send(studio);
    } catch (error) {
      next(error);
    }
  });