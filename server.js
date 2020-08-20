const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Custom modules
const Event = require('./models/Event');

const app = express();

let schema = buildSchema(`
    type Query {
        events: [Event!]!
    }
    type Mutation {
        createEvent(eventInput: EventInput!):Event! 
    }
    input EventInput {
        title: String!,
        description: String!,
        price: Float!,
        date: String!
    }
    type Event {
        _id: ID,
        title: String,
        description: String,
        price: Float,
        date: String
    }
`);

let events = () => {
    return Event
    .find({})
    .then(result => result);
};

let createEvent = args => {
    let event = new Event({
        ...args.eventInput,
        date: new Date(args.eventInput.date)
    });

    return event.save().then(result => result);
};

let rootValue = {
    events,
    createEvent
}

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@wasaly.sqv2c.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(5000, () => console.log('Server is up and running on port: 5000!'));
})
.catch(err => {
    throw err;
});