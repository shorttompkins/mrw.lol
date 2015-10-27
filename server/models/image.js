let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let ImageSchema = new Schema({
  url:    String
})

module.exports = mongoose.model('User', ImageSchema)
