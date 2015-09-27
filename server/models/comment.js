let mongoose = require('mongoose')

let CommentSchema = new mongoose.Schema({
  image_id:   { type: mongoose.ObjectId },
  email:      { type: String },
  name:       { type: String },
  gravatar:   { type: String },
  comment:    { type: String },
  timestamp:  { type: Date, 'default': Date.now }
})

CommentSchema.virtual('image')
  .set((image) => this._image = image)
  .get(() => this._image)

module.exports = mongoose.model('Comment', CommentSchema)
