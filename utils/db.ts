import {createPool} from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'landmark_guesser_db',
  namedPlaceholders: true,
  decimalNumbers: true,
});
