import request from 'supertest';
import app from '../lib/app.js';
import database from '../lib/utils/database.js';
import Actor from '../lib/models/Actor';

describe('actor routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new actor', async () => {
    const newActor = await request(app).post('/api/v1/actors').send({
      name: 'Keanu Reeves',
      dob: 'September 2nd 1964',
      pob: 'Beirut, Lebanon'
    });

    expect(newActor.body).toEqual({
      id: 1,
      name: 'Keanu Reeves',
      dob: 'September 2nd 1964',
      pob: 'Beirut, Lebanon',
    });
  });
});
