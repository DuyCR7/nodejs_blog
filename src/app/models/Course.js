const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
  name: {type: String, maxLength: 255, required: true},
  description: {type: String, required: true},
  image: {type: String},
  slug: { type: String, slug: "name", unique: true},
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', Course);
