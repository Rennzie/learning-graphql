import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const TweetSchema = new mongoose.Schema({
  body: String,
  date: Date,
  author_id: { type: ObjectId, ref: 'User' }
});

// make sure the virtuals get added
TweetSchema.set('toObject', { virtuals: true });
TweetSchema.set('toJSON', { virtuals: true });

TweetSchema.virtual('id').get(function() {
  const stringId = JSON.stringify(this._id);
  return JSON.parse(stringId);
});

module.exports = mongoose.model('Tweet', TweetSchema);
