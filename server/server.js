import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
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

// db.select('*')
//   .from('users')
//   .then((data) => console.log(data));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const saltRounds = 11;

const database = {
  users: [
    {
      id: '201',
      name: 'john',
      email: 'johndoe@gmail.com',
      password: '$2b$11$KWQff1adUzTenEaRznh9lepKO6LKjJ3HtMeJpEM9pOeJ3pAqwdnlW',
      entires: 0,
      joined: new Date(),
    },
    {
      id: '203',
      name: 'sally',
      email: 'sally_doe@gmail.com',
      password: 'booksfan',
      entires: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signing', async (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' && password === '') {
    res.status(400).json('error logging in');
  } else if (email !== null && password !== null) {
    const match = await bcrypt.compare(password, database.users[0].password);

    if (email === database.users[0].email && match) {
      console.log('welcome ' + req.body.email);
      res.status(200).json('success');
      next();
      return;
    }
  }
  res.status(400).json('error logging in');
});

app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  const username = email.split('@').shift();
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  db('users')
    .insert({
      email,
      name,
      username,
      joined: new Date(),
    })
    .returning('*')
    .then((user) => {
      if (user) {
        res.json(user);
      }
    })
    .catch((err) => {
      console.log(err.code);

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
  database.users.forEach((user) => {
    if (user.id === id) {
      user.entires++;
      return res.status(200).json(user.entires);
    }
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
