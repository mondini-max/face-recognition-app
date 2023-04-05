import knex from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

const { DatabaseHOST, DatabaseUSER, DatabasePASSWORD, DatabaseName } =
  process.env;

const db = knex({
  client: 'pg',
  connection: {
    host: DatabaseHOST,
    user: DatabaseUSER,
    password: DatabasePASSWORD,
    database: DatabaseName,
  },
});

export default db;
