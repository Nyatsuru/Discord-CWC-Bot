const mongoose = require('mongoose');

module.exports = function() {
  const schema = new mongoose.Schema({
    player: { type: String },
    drop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drop'
    },
  });

  return mongoose.model('Playerdrop', schema);
}();