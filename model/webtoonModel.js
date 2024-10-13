const mongoose = require('mongoose');

const webtoonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  characters: { type: [String], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Webtoon', webtoonSchema);
