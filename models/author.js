const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },

  // String is shorthand for {type: String}
  selfIntro: String,
});

module.exports = mongoose.model('Author', authorSchema);