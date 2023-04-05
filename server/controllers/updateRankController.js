const updateRank = async (req, res, db) => {
  const { id } = req.body;
  // console.log(id);
  await db('users')
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
};

export default updateRank;
