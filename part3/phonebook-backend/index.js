const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
// app.use(morgan('tiny'));

// 1st method
// app.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms',
//       req.body ? JSON.stringify(req.body) : ''
//     ].join(' ')
//   })
// )

// 2nd method
morgan.token('requestContent', (req, res) =>  JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestContent'))
app.use(cors());

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

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

const isNameUnique = (name) => {
    const existingName = persons.find((person) => person.name === name);
    if (existingName){
        return false;
    }
    return true;
}

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

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'One of the required fields is missing.'
        })
    } else if (!isNameUnique(body.name)){
        return response.status(400).json({
            error: 'Name must be unique.'
        })
    }
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number
        }

        persons = persons.concat(person);
        response.json(person);   
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});