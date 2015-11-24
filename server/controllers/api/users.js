let Models = require('../../models')

module.exports = {
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
  }
}
