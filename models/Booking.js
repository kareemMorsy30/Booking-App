const mongoose = require('mongoose');
const mongoose_autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const bookingSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        autopopulate: true
    }
},
{
    timestamps: true
});

bookingSchema.plugin(mongoose_autopopulate);

module.exports = mongoose.model('Booking', bookingSchema);