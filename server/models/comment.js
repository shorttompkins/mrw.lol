let mongoose = require('mongoose')

let CommentSchema = new mongoose.Schema({
  post_id:   { type: mongoose.Schema.ObjectId },
  timestamp:  { type: Date, 'default': Date.now },
  email:      { type: String },
  name:       { type: String },
  gravatar:   { type: String },
  comment:    { type: String }
})

CommentSchema.virtual('post')
  .set((post) => this._post = post)
  .get(() => this._post)

module.exports = mongoose.model('Comment', CommentSchema)
