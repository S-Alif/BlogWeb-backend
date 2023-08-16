const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name:{type: String},
  last_name:{type: String},
  email:{type:String, unique: true},
  password:{type:String},
  pfp: { type: String, default: "https://placehold.co/800?text=Hello+World&font=roboto"},
  role:{type: String, default: "user"},
  totalReaction:{type:Number, default: 0},
  totalCommentCount:{type:Number, default: 0}
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model('users', userSchema)