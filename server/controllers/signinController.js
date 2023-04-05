const signinController = async (req, res, next, db, bcrypt) => {
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
  next();
};

export default signinController;
