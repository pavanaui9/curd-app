const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Source = new Schema({
  ipaddress: {
    type: String
  },
  name: {
    type: String
  },
  domain: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
},{
    collection: 'source'
});

module.exports = mongoose.model('Source', Source);