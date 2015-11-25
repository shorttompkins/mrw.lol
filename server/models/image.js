let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.join(__dirname, `../config/config.${process.env.NODE_ENV || 'dev'}.json`))

let ImageSchema = new Schema({
  url:        String,
  filename:   String,
  uniqueid:   String,
  timestamp:  { type: Date, default: Date.now() }
}, { toJSON: { virtuals: true } })

ImageSchema.virtual('tags')
  .set(function(tags) {
    this._tags = tags
  })
  .get(function() { return this._tags })

ImageSchema.virtual('web_url')
  .get(function() {
    return `${config.image_root_url}${this.url}`
  })

ImageSchema.statics.generateUniqueId = function() {
  let length = 16,
      charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = ''

  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

ImageSchema.statics.getTags = function(image, cb, userid) {
  let UserModel = require('./user'),
      options = [
        { $unwind: '$tags' },
        { $unwind: '$tags.images' },
        { $group: { '_id': '$tags.images', 'tags': { $push: '$tags.name' } } },
        { $unwind: '$tags' },
        { $match: { '_id': image._id } },
        { $sort: { 'tags': 1 } },
        { $group: { '_id': 1, 'tags': { $addToSet: '$tags' } } }
      ]
  if (userid) {
    options.unshift({ $match: { '_id': userid } })
  }

  UserModel.aggregate(options, (err, tags) => {
    image.tags = tags[0].tags
    cb()
  })
}

module.exports = mongoose.model('Image', ImageSchema)
