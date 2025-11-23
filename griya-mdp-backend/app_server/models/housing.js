const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Pending', 'Sold']
    },
    type: {
        type: String,
        required: false,
        enum: ['rumah', 'apartemen', 'villa']
    },
    description: {
        type: String,
        required: false
    },
    postedDays: {
        type: Number,
        required: false,
        min: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;