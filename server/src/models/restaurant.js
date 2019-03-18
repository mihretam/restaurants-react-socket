const mongoose = require('mongoose');
var {OrderList} = require('./orderList');


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

// RestaurantSchema.pre('remove', function (next) {

//     var restaurant = this;
  
//     OrderList.find({restaurantId: this._id}).then( (orderLists) => {
//         for(let orderList in orderLists) {
//             orderList.closed = true;
//             orderList.save();
//         }

//         next();
//     }).catch( (err) => {
//         console.log(err);
//         next();
//     })

// });

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = { Restaurant };
