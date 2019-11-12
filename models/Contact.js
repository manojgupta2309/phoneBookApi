var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = new Schema(
  {
    name: {type: String,required: true},
    email: {type: String,required: true},
    userEmail: {type: String,required: true},
    phone: {type: String,required: true},
    city:{type: String,required: true},
    createdOn: {type: Date,default:Date.now}
  }
);
module.exports = mongoose.model('Contact', ContactSchema);
