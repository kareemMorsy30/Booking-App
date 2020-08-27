const Booking = require('./../models/Booking');
const Event = require('../models/Event');

let formatBooking = booking => {
    return {
        ...booking._doc,
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
    };
}

let bookings = async () => {
    const allBookings = await Booking.find({});
    return allBookings.map(booking => {
        return formatBooking(booking);
    })
}

let addBooking = async ({eventId}) => {
    const event = await Event.findById(eventId);
    const booking = new Booking({
        user: '5f41949ec52cdd3a1b5c801b',
        event: event._doc._id
    });
    const savedBooking = await booking.save();
    return formatBooking(savedBooking);
};

let cancelBooking = async ({bookingId}) => {
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