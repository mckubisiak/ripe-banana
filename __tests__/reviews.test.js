import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';
import database from '../lib/utils/database.js';

describe('review routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new review', async () => {
    const studio = await Studio.create({
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    });

    const reviewer = await Reviewer.create({
      id: 1,
      name: 'Robb Owen',
      company: 'SynthWave',
    });

    const film = await Film.create({
      title: 'The Room',
      StudioId: studio.id,
      released: 2003,
    });

    const review = {
      FilmId: film.id,
      ReviewerId: reviewer.id,
      rating: 5,
      review: 'movie was trash',
    };

    const newReview = await request(app).post('/api/v1/reviews').send(review);

    expect(newReview.body).toEqual({
      id: 1,
      ...review,
    });
  });

  it('gets a review by PKfire', async () => {
    const review = await Review.create({
      rating: 5,
      review: 'it was okay',
    });

    const res = await request(app).get(`/api/v1/reviews/${review.id}`);

    expect(res.body).toEqual({
      id: 1,
      ...review.toJSON(),
    });
  });

  it('gets all reviews', async () => {

    const studio = await Studio.create({
      name: 'Ghibli',
      city: 'Tokyo',
      state: 'Kanto',
      country: 'Japan',
    });

    const reviewer = await Reviewer.create({
      id: 1,
      name: 'Robb Owen',
      company: 'SynthWave',
    });

    const film = await Film.create({
      title: 'The Room',
      StudioId: studio.id,
      released: 2003,
    });

    const review = {
      FilmId: film.id,
      ReviewerId: reviewer.id,
      rating: 5,
      review: 'movie was trash',
    };

    const review2 = {
      FilmId: film.id,
      ReviewerId: reviewer.id,
      rating: 4,
      review: 'could have been better',
    };


    await Review.bulkCreate([review, review2]);
    return request(app)
      .get('/api/v1/reviews')
      .then((res) => {
        expect(res.body).toEqual([
          {
            Film: { id:1,  title: 'The Room' },
            id: 1,
            rating: 5,
            review: 'movie was trash',
          },
          {
            Film: { id:1,  title: 'The Room' },
            id: 2,
            rating: 4,
            review: 'could have been better',
          },
        ]);
      });
  });
});
