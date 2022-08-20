const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Author' // Specifies the name of the model. Must match mongoose.Model('thisStringHere!', authorSchema)
  },
  coverImageName: { // Will refer to a file in the file system, so that we don't
    // need to store a file in the actual MongoDB.
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Book', bookSchema);