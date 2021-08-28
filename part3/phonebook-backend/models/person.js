require('dotenv').config();
const mongoose = require('mongoose');

const dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then((result) => {
    console.log('$ Successfully connected to database. $');
})
.catch((error) => {
    console.log('# Couldnt connect to database #' , error.message);
})

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model("Person", personSchema);