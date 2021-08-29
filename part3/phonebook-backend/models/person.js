require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// eslint-disable-next-line no-undef
const dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('$ Successfully connected to database. $');
  })
  .catch((error) => {
    console.log('# Couldnt connect to database #' , error.message);
  });

const personSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true, minLength: 3 },
  number: { type: String, required: true, minLength: 8 }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(),
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);