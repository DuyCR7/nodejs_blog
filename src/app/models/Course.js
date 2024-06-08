const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema({
  _id: {type: Number},
  name: {type: String, maxLength: 255, required: true},
  description: {type: String, required: true},
  image: {type: String},
  slug: { type: String, slug: "name", unique: true},
}, {
  _id: false,
  timestamps: true,
});

// Autoincrement _id field
Course.plugin(AutoIncrement);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
