import { Router } from 'express';
import Actor from '../models/Actor.js';
import Film from '../models/Film.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const actor = await Actor.create(req.body);
      res.send(actor);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const actor = await Actor.findAll();
      res.send(actor);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const actorWithFilms = await Actor.findOne({
        where: { id: req.params.id },
        include: [{ model: Film, attributes: ['title', 'released', 'id'] }]
  
      });
      res.send(actorWithFilms);
    } catch (error) {
      next(error);
    }
  });
