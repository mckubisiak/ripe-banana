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
      dob: Date.UTC(1964, 9, 2),
      pob: 'Beirut, Lebanon'
    });

    expect(newActor.body).toEqual({
      id: 1,
      name: 'Keanu Reeves',
      dob: '1964-10-01',
      pob: 'Beirut, Lebanon'
    });
  });

  it('gets all actors', async () => {
    const actor1 = {
      name: 'Keanu Reeves',
      dob: Date.UTC(1964, 9, 2),
      pob: 'Beirut, Lebanon',
    };

    const actor2 = {
      name: 'Bill Murray',
      dob: Date.UTC(1950, 9, 21),
      pob: 'Beirut, Lebanon',
    };

    await Actor.bulkCreate([actor1, actor2]);
    return request(app)
      .get('/api/v1/actors')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Keanu Reeves',
            dob: '1964-10-01',
            pob: 'Beirut, Lebanon',
          },
          {
            id: 2,
            name: 'Bill Murray',
            dob: '1950-10-20',
            pob: 'Beirut, Lebanon',
          },
        ]);
      });
  });
});
