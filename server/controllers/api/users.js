let Models = require('../../models'),
    ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  getTags(req, res) {
    Models.User.aggregate([
      { $unwind: '$tags' },
      { $sort: { 'tags.name': -1 } },
      { $group: { '_id': '1', 'tags': { $addToSet: '$tags.name' } } }
    ], (err, tags) => {
      if (tags.length) {
        res.json(tags[0].tags)
      } else {
        res.json([])
      }
    })
  }
}
