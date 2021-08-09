import request from 'supertest';
import app from '../lib/app.js';
// import Film from '../lib/models/Film.js';
import database from '../lib/utils/database.js';

describe.skip('film routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new film', async () => {
    const newFilm = await request(app)
      .post('/api/v1/films')
      .send({
        title: 'The Room',
        // studio: 2,
        released: 2003
      });

    expect(newFilm.body).toEqual({
      id: 1,
      title: 'The Room',
      // studio: 2,
      released: 2003
    });
  });
});
