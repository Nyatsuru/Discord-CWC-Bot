const mongoose = require('mongoose');

module.exports = function() {
  const schema = new mongoose.Schema({
    key: { type: String },
    type: { type: String },
    name: { type: String },
    level: { type: Number },
    health: { type: Number },
    moveset: { type: Object },
    description: { type: String },
  });

  schema.index({ key: 1 }, { unique: true })

  return mongoose.model('activeMob', schema);
}();