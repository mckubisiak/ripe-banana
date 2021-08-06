import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studiosController from './controllers/studios.js';
import reviewersController from './controllers/reviewers.js';

const app = express();


app.use(express.json());

app.use('/api/v1/studios', studiosController);
app.use('/api/v1/reviewers', reviewersController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
