let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  name:      { type: String },
  networkID: { type: String },
  provider:  { type: String },
  uniqueVal: { type: String }
})

module.exports = mongoose.model('User', UserSchema)