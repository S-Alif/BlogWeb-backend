const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  blogTitle:{type: String, required: true},
  blogText:{type: String, required: true},
  category:{type: String, required: true},
  reactionCount:{type: Number, default: 0},
  commentCount:{type: Number, default: 0},
  blogCoverImg: { type: String, default: "https://placehold.co/1920x1080?font=roboto"},
  author:{type: String}
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('blogs', blogSchema)