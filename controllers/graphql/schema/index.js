const { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Query {
        events: [Event!]!,
        users: [User!]!,
        bookings: [Booking!]!
    }
    type Mutation {
        createEvent(eventInput: EventInput!):Event!,
        createUser(userInput: UserInput!):User!,
        addBooking(eventId: ID!):Booking!,
        cancelBooking(bookingId: ID!):Event
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
    type Booking {
        _id: ID,
        user: User!,
        event: Event!,
        createdAt: String!,
        updatedAt: String!
    }
`);

module.exports = schema;