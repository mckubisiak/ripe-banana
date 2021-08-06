import request from 'supertest';
import app from '../lib/app.js';
import reviewers from '../lib/controllers/reviewers.js';
import Reviewer from '../lib/models/Reviewer.js';
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
  it('gets all reviewers', async () => {
    const robb = {
      id: 1,
      name: 'Robb Owen',
      company: 'SynthWave',
    };

    const owen = {
      id: 2,
      name: 'Owen Robb',
      company: 'SynthWave',
    };

    await Reviewer.bulkCreate([robb, owen]);
    return request(app)
      .get('/api/v1/reviewers')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Robb Owen',
            company: 'SynthWave',
          },
          {
            id: 2,
            name: 'Owen Robb',
            company: 'SynthWave',
          },
        ]);
      });
  });
});
