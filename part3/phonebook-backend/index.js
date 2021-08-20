const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    const currentDate = new Date();
    response.send(`
    <div>
        h1>Phonebook has info for ${persons.length} persons</h1>
        <p>${currentDate}</p>
    </div>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const requestId = Number(request.params.id);
    const person = persons.find((person) => person.id === requestId);
    if (person) {
        response.json(person);
    } else {
        return response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const requestId = Number(request.params.id);
    persons = persons.filter((person) => person.id !== requestId);
    response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});