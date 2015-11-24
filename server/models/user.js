let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let UserTagSchema = new Schema({
  name:       String,
  images:     [Schema.Types.ObjectId],
  timestamp:  { type: Date, default: Date.now }
})

let UserSchema = new Schema({
  name:         String,
  timestamp:    { type: Date, default: Date.now },
  display:      String,
  email:        String,
  avatar:       String,
  social:       {
    network_id:   String,
    provider:     String,
    unique_val:   String,
    access_token: String
  },
  tags:         [UserTagSchema]
})

module.exports = mongoose.model('User', UserSchema)
