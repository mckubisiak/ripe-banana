import request from 'supertest';
import app from '../lib/app.js';
import database from '../lib/utils/database.js';
import Actor from '../lib/models/Actor';
import Film from '../lib/models/Film.js';

describe('actor routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new actor', async () => {
    const newActor = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Keanu Reeves',
        dob: Date.UTC(1964, 9, 2),
        pob: 'Beirut, Lebanon',
      });

    expect(newActor.body).toEqual({
      id: 1,
      name: 'Keanu Reeves',
      dob: '1964-10-01',
      pob: 'Beirut, Lebanon',
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
      pob: 'Evanston, IL',
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
            pob: 'Evanston, IL',
          },
        ]);
      });
  });

  it('gets an actor by PKthunder and add film', async () => {
    const actor = await Actor.create({
      id: 1,
      name: 'Bill Murray',
      dob: '1950-10-20',
      pob: 'Evanston, IL',
    });

    const film1 = await Film.create({
      title: 'Ghostbusters', released: 1984, ActorId: 1 
    });

    const film2 = await Film.create({
      title: 'The Life Aquatic', released: 2004, ActorId: 1
    });

    await actor.setFilms(film1, film2);
    await film1.setActors(actor);
    await film2.setActors(actor);
    

    const res = await request(app).get(`/api/v1/actors/${actor.id}`);
    console.log(actor.id);
    expect(res.body).toEqual({
      Films: [
        { ActorFilm: expect.any(Object), title: 'Ghostbusters', id: 1, released: 1984 },
        { ActorFilm: expect.any(Object), title: 'The Life Aquatic', id: 2, released: 2004 },
      ],

      ...actor.toJSON(),
    });
  });
});
