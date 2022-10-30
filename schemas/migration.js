const mongoose = require('mongoose');

module.exports = function() {
  const schema = new mongoose.Schema({
    name: { type: String },
  });

  return mongoose.model('Migration', schema);
}();