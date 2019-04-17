const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for our links
var urlSchema = new Schema({
  hashString: {
    type: String,
    index: true
  },
  long_url: String,
  created_at: Date
}, { 
    noVirtualId: true }
  );

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;
