const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
var bcrypt = require('bcryptjs');

// Custom modules
const Event = require('./models/Event');
const User = require('./models/User');

const app = express();

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
        date: String
    }
    type User {
        _id: ID,
        email: String!,
        password: String
    }
`);

let events = () => {
    return Event
    .find({})
    .then(result => result);
};

let createEvent = args => {
    return User.findById('5f41949ec52cdd3a1b5c801b')
    .then(user => {
        let event = new Event({
            ...args.eventInput,
            date: new Date(args.eventInput.date),
            creator: user._id
        });
    
        return event.save().then(result => {
            user.createdEvents.push(result._id);
            user.save();
            return result;
        });
    });
};

let users = () => {

}

let createUser = args => {
    return User
    .findOne({email: args.userInput.email})
    .then(user => {
        if(user){
            throw new Error('User already exists!');
        }else {
            let user = new User({
                ...args.userInput,
                password: bcrypt.hashSync(args.userInput.password, 12)
            })
        
            return user
            .save()
            .then(result => {
                return {
                    ...result._doc,
                    password: null
                };
            })
            .catch(err => {
                throw err;
            })
        }
    })
}

let rootValue = {
    events,
    createEvent,
    users,
    createUser
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