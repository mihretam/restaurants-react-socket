const mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
        unique: true
    },
    workingHours: {
        type: String,
        required: true
    },
    restaurantLink: {
        type: String,
        required: true
    }
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = { Restaurant };
