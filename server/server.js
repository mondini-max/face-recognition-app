import express from 'express';
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

const app = express();
dotenv.config();

const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req, res) => {
//   res.send(database.users);
// });

app.post('/signing', (req, res, next) =>
  signinController(req, res, next, db, bcrypt)
);
app.post('/register', (req, res) => registerController(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => getUserById(req, res, db));
app.put('/image', (req, res) => updateRank(req, res, db));

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
