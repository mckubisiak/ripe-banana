import request from 'supertest';
import app from '../lib/app.js';
import database from '../lib/utils/database.js';
import Studio from '../lib/models/Studio';

describe('studio routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new studio', async () => {
    const newStudio = await request(app).post('/api/v1/studios').send({
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

  it('gets a studio by id via GET', async () => {
    const studio = await Studio.create({
      id: 1,
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    });
    const res = await request(app).get('/api/v1/studios/1');

    expect(res.body).toEqual(studio.toJSON());
  });

  it('gets all studios', async () => {
    const toto = {
      id: 1,
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    };

    const studio2 = {
      id: 2,
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    };

    await Studio.bulkCreate([toto, studio2]);
    return request(app)
      .get('/api/v1/studios')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Ghibli',
            city: 'Tokyo',
            state: 'Kanto',
            country: 'Japan',
          },
          {
            id: 2,
            name: 'Ghibli',
            city: 'Tokyo',
            state: 'Kanto',
            country: 'Japan',
          },
        ]);
      });
  });
  
});
