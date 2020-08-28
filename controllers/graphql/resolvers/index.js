const {
    userController,
    eventController,
    bookingController,
    authController
} = require('../../allControllers');

let rootValue = {
    events: eventController.events,
    createEvent: eventController.createEvent,
    users: userController.users,
    createUser: userController.createUser,
    bookings: bookingController.bookings,
    addBooking: bookingController.addBooking,
    cancelBooking: bookingController.cancelBooking,
    login: authController.login
}

module.exports = rootValue;