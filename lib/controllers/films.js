import { Router } from 'express';
import Actor from '../models/Actor.js';
import Film from '../models/Film.js';
import Review from '../models/Review.js';
import Reviewer from '../models/Reviewer.js';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const film = await Film.create(req.body);
      res.send(film);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const film = await Film.findByPk(req.params.id, {
        attributes: ['id', 'released', 'title'],
        include: [
          { model: Studio, attributes: ['id', 'name'] },
          { model: Actor, through: { attributes: [] },  attributes: ['id', 'name'] },
          { model: Review, attributes: ['id', 'rating', 'review'], include: { model: Reviewer, attributes: ['id', 'name'] } },
        ],
      });
      res.send(film);
    } catch (error) {
      next(error);
    }
  });
