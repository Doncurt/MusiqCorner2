var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title             : { type: String, required: true }
  , videoUrl             : { type: String, required: true }
  , summary         : { type: String, required: true }
  , category        : { type: String, required: true }
  , comments        : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  , author          : { type: Schema.Types.ObjectId, ref: 'User', required: true }
  , upVotes        : []
  , downVotes      : []
  , voteScore      : { type: Number, default: 0 }

});
// Autopopulation
const autoPopulatePosts = function(next) {
  this.populate('comments').populate('author');
  next();
};
PostSchema.
  pre('find', autoPopulatePosts).
  pre('findOne', autoPopulatePosts);
module.exports = mongoose.model('Post', PostSchema);
