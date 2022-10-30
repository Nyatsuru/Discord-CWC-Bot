const mongoose = require('mongoose');

module.exports = function() {
  const schema = new mongoose.Schema({
    type: { type: String },
    name: { type: String },
    level: { type: Number },
    health: { type: Number },
    moveset: { type: Object },
    description: { type: String },
  });

  return mongoose.model('Mob', schema);
}();