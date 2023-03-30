import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 4000;
app.use('/', (req, res, next) => {
  res.send('Hello express server');
  next();
  return;
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
