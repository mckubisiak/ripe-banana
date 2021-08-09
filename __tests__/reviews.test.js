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
      .post('/api/v1/review')
      .send({
        rating: 5,
        review: 'movie was trash',
      });
  });
});
