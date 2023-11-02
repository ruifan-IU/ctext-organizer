const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rfan1986:TsingHuaDaXue5@cluster0.bbryaru.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'ctext'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;
const textSchema = new Schema({
  fulltext: Array,
  title: String,
});

const Text = mongoose.model('text', textSchema);

module.exports = {
  Text,
};