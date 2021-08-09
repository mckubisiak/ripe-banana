import { Router } from 'express';
import Review from '../models/Review.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const review = await Review.create(req.body);
      res.send(review);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);
      res.send(review);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const review = await Review.findAll();
      res.send(review);
    } catch (error) {
      next(error);
    }
  });
