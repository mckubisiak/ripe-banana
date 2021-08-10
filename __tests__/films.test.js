import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';
// import Film from '../lib/models/Film.js';
import database from '../lib/utils/database.js';

describe('film routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a film', async () => {
    const studio = await Studio.create({
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    });

    const film = await request(app).post('/api/v1/films').send({
      title: 'The Room',
      StudioId: studio.id,
      released: 2003,
    });

    expect(film.body).toEqual({
      id: 1,
      title: 'The Room',
      StudioId: 1,
      released: 2003,
    });
  });

 


});
