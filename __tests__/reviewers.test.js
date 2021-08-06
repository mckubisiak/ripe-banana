import request from 'supertest';
import app from '../lib/app.js';
import database from '../lib/utils/database.js';

describe('reviewer routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new reviewer', async () => {
    const newReviewer = await request(app).post('/api/v1/reviewers').send({
      name: 'Robb Owen',
      company: 'SynthWave',
    });

    expect(newReviewer.body).toEqual({
      id: 1,
      name: 'Robb Owen',
      company: 'SynthWave',
    });
  });
});
