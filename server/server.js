import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import bodyParser from 'body-parser';
// import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

const app = express();
dotenv.config();

const { DatabaseHOST, PORT, DatabaseUSER, DatabasePASSWORD, DatabaseName } =
  process.env;
const port = PORT || 4000;

const db = knex({
  client: 'pg',
  connection: {
    host: DatabaseHOST,
    user: DatabaseUSER,
    password: DatabasePASSWORD,
    database: DatabaseName,
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const saltRounds = 11;

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signing', async (req, res, next) => {
  const { email, password } = await req.body;
  await db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(async (data) => {
      if (data.length) {
        const isMatched = await bcrypt.compare(password, data[0].hash);
        // console.log(isMatched);
        if (isMatched) {
          return db
            .select('*')
            .from('users')
            .where('email', '=', email)
            .then((user) => {
              console.log(user);
              return res.status(200).json(user[0]);
            });
        } else {
          return res.status(400).json('incorrect username and / or password');
        }
      } else {
        res.status(404).json('Not Found');
      }
    });
});

app.post('/register', async (req, res) => {
  const { email, name, password } = await req.body;
  const username = await email.split('@').shift();
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await db
    .transaction((trx) => {
      trx
        .insert({
          hash: hashedPassword,
          email: email,
        })
        .into('login')
        .returning('email')
        .then(async (loginEmail) => {
          return await db('users')
            .insert({
              email: loginEmail[0]?.email,
              name,
              username,
              joined: new Date(),
            })
            .returning('*')
            .then((user) => {
              if (user) {
                return res.json(user);
              }
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => {
      // console.log(err.code);
      res
        .status(400)
        .json('unable to register/ please login or use another email address');
    });
});

app.get('/profile/:id', (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({
      id,
    })
    .then((user) => {
      if (user.length) {
        return res.status(200).json(user[0]);
      } else {
        return res.status(400).json('Not Found');
      }
    })
    .catch((err) => {
      return res.status(404).json('Not Found');
    });
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  console.log(id);
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entires) => {
      if (entires.length) {
        res.status(200).json(entires[0]);
      } else {
        res.status(404).json('Not Found');
      }
    })
    .catch((err) => {
      return res.status(404).json('Not Found');
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});

// Routes & views
//  / -->  GET homePage
//  /signing --> POST = success/fail
// /register ---> POST = user
//  /profile/:userId --> Get = user
//  /image --> PUT update/user
//
