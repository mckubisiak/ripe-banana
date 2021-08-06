import request from 'supertest';
import app from '../lib/app.js';
import database from '../lib/utils/database.js';

describe('studio routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new studio', async () => {
    const newStudio = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Ghibli',
        city: 'Tokyo',
        state: 'Kanto',
        country: 'Japan',
      });

    expect(newStudio.body).toEqual({
      id: 1,
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    });
  });
});
