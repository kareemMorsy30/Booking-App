const {
    userController,
    eventController,
    bookingController
} = require('../../allControllers');

let rootValue = {
    events: eventController.events,
    createEvent: eventController.createEvent,
    users: userController.users,
    createUser: userController.createUser,
    bookings: bookingController.bookings,
    addBooking: bookingController.addBooking,
    cancelBooking: bookingController.cancelBooking
}

module.exports = rootValue;