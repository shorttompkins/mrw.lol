let mongoose = require('mongoose')

let PostSchema = new mongoose.Schema({
  timestamp:  { type: Date, 'default': Date.now },
  author:     { type: mongoose.Schema.ObjectId },
  title:      { type: String },
  blurb:      { type: String },
  body:       { type: String }
})

module.exports = mongoose.model('Post', PostSchema)
