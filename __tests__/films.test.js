import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';
import Film from '../lib/models/Film.js';
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

  it('gets a film by id', async () => {
    const studio = await Studio.create({
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    });

    const film = await Film.create({
      title: 'The Room',
      StudioId: studio.id,
      released: 2003,
    });

    const reviewer = await Reviewer.create({
      id: 1,
      name: 'Robb Owen',
      company: 'SynthWave',
    });

    const review = await Review.create({
      FilmId: film.id,
      ReviewerId: reviewer.id,
      rating: 5,
      review: 'movie was trash',
    });

    const actor = await Actor.create({
      name: 'Bill Murray',
      dob: Date.UTC(1950, 9, 21),
      pob: 'Evanston, IL',
    });

    await actor.setFilms(film);
    await film.setActors(actor);

    await film.setReviews(review);

    const res = await request(app).get(`/api/v1/films/${film.id}`);

    expect(res.body).toEqual({
      id: 1,
      title: 'The Room',
      Studio: { id: 1, name: 'Ghibli' },
      Actors: [{ id: 1, name: 'Bill Murray' }],
      Reviews: [
        {
          id: 1,
          rating: 5,
          review: 'movie was trash',
          Reviewer: { id: 1, name: 'Robb Owen' },
        },
      ],

      released: 2003,
    });
  });
});
