const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
  reactedPostID: {type: string},
  author:{type: String}
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model('reactions', reactionSchema)