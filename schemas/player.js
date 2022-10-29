const mongoose = require('mongoose');

module.exports = function() {
  const schema = new mongoose.Schema({
    class: { class: String },
    name: { type: String },
    description: { type: String },
    agility: { type: Number },
    strength: { type: Number },
  });

  schema.index({ class: 1, name: 1 }, { unique: true })

  return mongoose.model('Player', schema);
}();