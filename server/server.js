import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import bcrypt, { hash } from 'bcrypt';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

  const match = await bcrypt.compare(password, database.users[0].password);

  if (email === database.users[0].email && match) {
    console.log('welcome ' + req.body.email);
    res.status(200).json('success');
    next();
    return;
  }
  res.status(400).json('error logging in');
});

app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  database.users.push({
    id: uuidv4(),
    name: name,
    email: email,
    password: hashedPassword,
    entires: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  database.users.forEach((user) => {
    if (user.id === userId) {
      return res.status(200).json(user);
    }
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
