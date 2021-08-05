import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studiosController from './controllers/studios.js';

const app = express();

app.use('/api/v1/studios', studiosController);

app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
