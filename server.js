import app from './lib/app.js';
import pool from './lib/utils/pool.js';

const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
