const Event = require('./../models/Event');
const User = require('./../models/User');

let events = () => {
    return Event
    .find({})
    .then(result => {
        return result.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString()
            };
        })
    });
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

module.exports = {
    events,
    createEvent
}