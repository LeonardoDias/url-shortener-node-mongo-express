const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    hashString: {
      type: String
    },
    long_url: String,
    created_at: Date
  }, 
  { 
    noVirtualId: true 
}
);

var Url = mongoose.model('shortnedURLs', urlSchema);

module.exports = Url;
