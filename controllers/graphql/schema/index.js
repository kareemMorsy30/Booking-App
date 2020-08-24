const { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Query {
        events: [Event!]!,
        users: [User!]!
    }
    type Mutation {
        createEvent(eventInput: EventInput!):Event!,
        createUser(userInput: UserInput!):User!
    }
    input EventInput {
        title: String!,
        description: String!,
        price: Float!,
        date: String!
    }
    input UserInput {
        email: String!,
        password: String!
    }
    type Event {
        _id: ID,
        title: String,
        description: String,
        price: Float,
        date: String,
        creator: User!
    }
    type User {
        _id: ID,
        email: String!,
        password: String,
        createdEvents: [Event!]!
    }
`);

module.exports = schema;