const express = require('express');
const app = express();
app.use(express.static('build'));
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

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

const unknownEndpointHandler = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint. '})
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: "Seems like there is malformatted id." })
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message})
    }

    next(error);
}

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    })
    .catch((error) => next(error));
})

app.get('/info', (request, response) => {
    const currentDate = new Date();
    Person.find({}).then((persons) => {
       if (persons){
        response.send(`
        <div>
            <h1>Phonebook has info for ${persons.length} persons</h1>
            <p>${currentDate}</p>
        </div>
        `)
       } else {
        response.send(`
        <div>
            <h1>There are currently no entries for the phonebook.</h1>
            <p>${currentDate}</p>
        </div>
        `)
       }
    })
    .catch((error) => next(error));
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then((person) => {
        if (person) {
            response.json(person);
        }else{
            response.status(404).send({ error: 'Person not found'})
        }
    })
    .catch((error) => next(error));
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(() => {
        response.status(204).end();
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'One of the required fields is missing.'
        })
    } 
        const person = new Person ({
            name: body.name,
            number: body.number
        })

        person.save()
        .then((savedPerson) => savedPerson.toJSON())
        .then((formattedPerson) => {
            response.json(formattedPerson);
        })
        .catch((error) => next(error));
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
        response.json(updatedPerson);
    })
    .catch((error) => next(error))
})

app.use(unknownEndpointHandler);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});