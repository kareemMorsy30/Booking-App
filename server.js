const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

// Custom modules
const schema = require('./controllers/graphql/schema');
const {
    userController,
    eventController
} = require('./controllers/allControllers');

const app = express();

let rootValue = {
    events: eventController.events,
    createEvent: eventController.createEvent,
    users: userController.users,
    createUser: userController.createUser
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