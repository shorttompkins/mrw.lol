let Models = require('../../models')

module.exports = {
  getUserById(req, res) {
    Models.User.findOne({_id: req.session.user_id}, (err, user) => {
      delete user.social
      res.json(user)
    })
  },
  getTags(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags' },
      { $group: { '_id': '1', 'tags': { $addToSet: '$tags.name' } } },
      { $unwind: '$tags' },
      { $sort: { 'tags': 1}},
      { $group: { '_id': '1', 'tags': { $push: '$tags' } } }
    ], (err, tags) => {
      if (tags.length) {
        res.json(tags[0].tags)
      } else {
        res.json([])
      }
    })
  },
  getTagsByUserId(req, res) {
    Models.User.aggregate([
      { $match: { '_id': req.params.userid } },
      { $unwind: '$tags' },
      { $group: { '_id': '1', 'tags': { $addToSet: '$tags.name' } } },
      { $unwind: '$tags' },
      { $sort: { 'tags': 1}},
      { $group: { '_id': '1', 'tags': { $push: '$tags' } } }
    ], (err, tags) => {
      if (tags.length) {
        res.json(tags[0].tags)
      } else {
        res.json([])
      }
    })
  }
}
