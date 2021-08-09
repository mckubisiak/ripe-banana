import request from 'supertest';
import app from '../lib/app.js';
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
      rating: 5,
      review: 'it was okay',
    });

    const res = await request(app).get(`/api/v1/reviews/${review.id}`);

    expect(res.body).toEqual({
      id: 1,
      ...review.toJSON(),
    });
  });

  it('gets all review', async () => {
    const review1 = {
      rating: 5,
      review: 'it was okay',
    };

    const review2 = {
      rating: 4,
      review: 'could have been better',
    };

    await Review.bulkCreate([review1, review2]);
    return request(app)
      .get('/api/v1/reviews')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            rating: 5,
            review: 'it was okay',
          },
          {
            id: 2,
            rating: 4,
            review: 'could have been better',
          },
        ]);
      });
  });
});
