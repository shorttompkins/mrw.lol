let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let UserImageSchema = new Schema({
  image_id:   Schema.Types.ObjectId,
  timestamp:  { type: Date, default: Date.now },
  tags:       [String]
})

let UserSchema = new mongoose.Schema({
  name:         String,
  timestamp:    { type: Date, default: Date.now },
  // TO DO: need a unique display name for the site itself
  social:       {
    network_id:   String,
    provider:     String,
    unique_val:   String,
    access_token: String,
    avatar:       String
  },
  images:       [UserImageSchema]
})

module.exports = mongoose.model('User', UserSchema)
