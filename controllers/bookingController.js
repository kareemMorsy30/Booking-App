const Booking = require('./../models/Booking');
const Event = require('../models/Event');

let formatBooking = booking => {
    return {
        ...booking._doc,
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
    };
}

let bookings = async (args, req) => {
    if(!req.isAuth) throw new Error('User is not authenticated!');
    const allBookings = await Booking.find({user: req.user._id});
    return allBookings.map(booking => {
        return formatBooking(booking);
    })
}

let addBooking = async ({eventId}, req) => {
    if(!req.isAuth) throw new Error('User is not authenticated!');
    const event = await Event.findById(eventId);
    const booking = new Booking({
        user: req.user._id,
        event: event._doc._id
    });
    const savedBooking = await booking.save();
    return formatBooking(savedBooking);
};

let cancelBooking = async ({bookingId}, req) => {
    if(!req.isAuth) throw new Error('User is not authenticated!');
    const booking = await Booking.findById(bookingId);
    await Booking.deleteOne({_id: booking._doc._id});
    return {
        ...booking._doc.event._doc,
        date: new Date(booking._doc.event._doc.date).toISOString()
    };
}

module.exports = {
    bookings,
    addBooking,
    cancelBooking
}