import { Router } from 'express';

export default Router().post('/', async (req, res, next) => {
  try {
    const studio = {
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    };

    res.send(studio);

  } catch (error) {
    next(error);
  }
});
