import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.create(req.body);
      res.send(reviewer);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.findAll();
      res.send(reviewer);
    } catch (error) {
      next(error);
    }
  });
