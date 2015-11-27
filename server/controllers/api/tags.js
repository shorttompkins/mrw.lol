let Models = require('../../models'),
    ObjectId = require('mongoose').Types.ObjectId

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
  },
  getTagsByUserId(req, res) {
    Models.User.aggregate([
      { $match: { '_id': new ObjectId(req.params.userid) } },
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
  getTagsByUserIdImageId(req, res) {
    Models.Image.findOne({uniqueid: req.params.imageid}, (err, image) => {
      if (err) {
        res.status(404).json({error: 'Image not found.'})
      } else {
        Models.User.aggregate([
          { $match: { '_id': new ObjectId(req.params.userid) } },
          { $unwind: '$tags' },
          { $match: { 'tags.images': {$in: [image._id]} } },
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
    })
  }
}
