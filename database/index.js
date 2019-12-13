const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ikea');

const db = mongoose.connection;

db.on('error', console.error.bind(console, `connection error: `));
db.once('open', () => console.log(`we're connected to Davids Database!!!`));

var ikeaSchema = new mongoose.Schema({
  name: String,
  shortDesc: String,
  price: Number,
  rating: Number,
  reviewNum: Number,
  midDesc: String,
  imageSrc: [String]
});

var IkeaImgs = mongoose.model('IkeaImgs', ikeaSchema);

var save = (data, callback) => {

  IkeaImgs.insertMany(data, (err, results) => {
    if (err) {
      callback(err)
    } else {
      callback(null, results)
    }
  })
}

var getAll = (callback) => {

  IkeaImgs.find({}, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}



module.exports.save = save;
module.exports.getAll = getAll;
