const getUserById = (req, res, db) => {
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
};

export default getUserById;
