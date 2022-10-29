const mongoose = require('mongoose');

module.exports = function() {
  const schema = new mongoose.Schema({
    rarity: { type: String },
    chance: { type: String },
    name: { type: String },
    image: { type: String },
    description: { type: String },
  });

  schema.index({ type: 1, name: 1 }, { unique: true })

  return mongoose.model('Drop', schema);
}();