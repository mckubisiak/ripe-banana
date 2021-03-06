import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const studio = await Studio.create(req.body);
      res.send(studio);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const studio = await Studio.findByPk(req.params.id);

      res.send(studio);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const studio = await Studio.findAll();
      res.send(studio);
    } catch (error) {
      next(error);
    }
  });
