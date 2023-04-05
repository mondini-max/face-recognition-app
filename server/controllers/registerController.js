const saltRounds = 11;
const registerController = async (req, res, db, bcrypt) => {
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
                return res.json(user[0]);
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
};

export default registerController;
