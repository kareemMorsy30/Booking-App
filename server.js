const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

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
        price: Float!
    }
    type Event {
        _id: ID,
        title: String,
        description: String,
        price: Float,
        date: String
    }
`);

const Events = [];

let events = () => Events;
let createEvent = args => {
    let Event = {
        ...args.eventInput,
        _id: Math.floor((Math.random() * 1000000) + 1),
        date: new Date().toISOString()
    }
    Events.push(Event);
    return Event;
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

app.listen(5000, () => console.log('Server is up and running on port: 5000!'));