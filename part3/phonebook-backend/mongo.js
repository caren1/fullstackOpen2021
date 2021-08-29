const mongoose = require('mongoose');

if (process.argv.length < 3){
  console.log('Please provide sufficient number of arguments to the command.');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://phonebookuser:${password}@phonebook-part3.fzfip.mongodb.net/people?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Successfully connected to DB'))
  .catch((error) => console.log(error.stack));

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3){
  Person.find().then(result => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else  if (process.argv.length > 3){
  const person = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  });

}