const mongoose = require('mongoose');

module.exports = function() {
  const schema = new mongoose.Schema({
    type: { type: String },
    name: { type: String },
    health: { type: Number },
    description: { type: String },
  });

  schema.index({ type: 1, name: 1 }, { unique: true })

  return mongoose.model('baseMob', schema);
}();