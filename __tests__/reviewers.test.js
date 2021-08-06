import request from 'supertest';
import app from '../lib/app.js';
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

  it('updates a reviewer', async () => {
    const robb = await Reviewer.create({
      id: 1,
      name: 'Robb Owen',
      company: 'SynthWave',
    });

    const res = await request(app)
      .patch(`/api/v1/reviewers/${robb.id}`)
      .send({ company: 'Darkwave' });

    expect(res.body).toEqual({
      id: 1,
      name: 'Robb Owen',
      company: 'Darkwave',
    });
  });

  it('deletes a reviewer', async () => {
    const robb = await Reviewer.create({
      id: 1,
      name: 'Robb Owen',
      company: 'SynthWave',
    });

    const res = await request(app)
      .delete(`/api/v1/reviewers/${robb.id}`);

    expect(res.body).toEqual({
      success: true 
    });
  });

});
