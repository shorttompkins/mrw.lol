let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let ImageSchema = new Schema({
  url:        String,
  filename:   String
})

module.exports = mongoose.model('Image', ImageSchema)
