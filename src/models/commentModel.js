const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  commentText: { type: String, required: true },
  commentedOnPost: { type: String },
  postTitle: {type: String},
  commentAuthor: {
    id: {type: String},
    first_name: { type: String },
    last_name: {type: String},
    pfp: {type: String}
  }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('comments', commentSchema)