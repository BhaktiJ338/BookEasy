const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId, require:true, ref:'Place'},
    user:{type:mongoose.Schema.Types.ObjectId, require:true},
    checkIn:{type:Date, required:true},
    checkOut:{type:Date, required:true},
    guests:Number,
    name:{type:String, required:true},
    phone:{type:String, required:true},
    price:Number
})

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;