import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  avatar_url: String
});

// make sure the virtuals get added
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

UserSchema.virtual('id').get(function() {
  const stringId = JSON.stringify(this._id);
  return JSON.parse(stringId);
});

module.exports = mongoose.model('User', UserSchema);
