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
  });
