import express, { response } from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import bodyParser from 'body-parser';
// import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import cors from 'cors';
import db from './DatabaseConfig/db.js';
import registerController from './controllers/registerController.js';
import signinController from './controllers/signinController.js';
import updateRank from './controllers/updateRankController.js';
import getUserById from './controllers/getUserByIdController.js';
import smart_ai_controller from './controllers/smart_ai_controller.js';

const app = express();
dotenv.config();

const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*')
    .from('users')
    .then((users) => res.json(users));
});

app.post('/signing', (req, res, next) =>
  signinController(req, res, next, db, bcrypt)
);
app.post('/register', (req, res) => registerController(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => getUserById(req, res, db));
app.put('/profile/:id', (req, res) => {
  // console.log(req.body);
  const { age, pet, name } = req.body.userInfo;
  const { id } = req.params;
  db('users')
    .where({ id: id })
    .update({ name, pet, age })
    .then((resp) => {
      // console.log('this is res in server', { resp });
      if (resp) {
        res.status(200).json('user info updated');
      } else {
        res.status(400).json('unable to update user');
      }
    })
    .catch((err) => {
      res.status(400).json('error updating user');
    });
});
app.put('/image', (req, res) => updateRank(req, res, db));
app.post('/smart-ai', (req, res) => smart_ai_controller(req, res));

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
