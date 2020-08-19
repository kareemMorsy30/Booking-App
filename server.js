const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

let schema = buildSchema(`
    type Query {
        events: [String]
    }
    type Mutation {
        createEvent(name: String):String 
    }
`);

let events = () => ['Romantic', 'Sports', 'Electronics'];
let createEvent = args => args.name;

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