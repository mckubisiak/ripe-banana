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
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      res.send(reviewer[1][0]);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await Reviewer.destroy({ where: { id: req.params.id } });

      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  });

  
