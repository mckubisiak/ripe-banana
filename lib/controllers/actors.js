import { Router } from 'express';
import Actor from '../models/Actor.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const actor = await Actor.create(req.body);
    res.send(actor);
  } catch (error) {
    next(error);
  }
});
