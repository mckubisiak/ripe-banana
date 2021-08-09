import request from 'supertest';
import app from '../lib/app.js';
import reviews from '../lib/controllers/reviews.js';
import Review from '../lib/models/Review.js';
import database from '../lib/utils/database.js';

describe('review routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a new review', async () => {
    const newReview = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        review: 'movie was trash',
      });

    expect(newReview.body).toEqual({
      id: 1,
      rating: 5,
      review: 'movie was trash',
    });
  });

  it('gets a review by PKfire', async () => {
    const review = await Review.create({
      rating: 3,
      review: 'it was okay',
    });

    const res = await request(app).get(`/api/v1/reviews/${reviews.id}`);

    expect(res.body).toEqual({
      id: 1,
      ...review.toJSON(),
    });
  });
});
