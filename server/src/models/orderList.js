const mongoose = require('mongoose');
const _ = require('lodash');


var OrderListSchema = new mongoose.Schema({
    restaurantId: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    closed: {
       type: Boolean,
       default: false
    },
    meals: [{
       food: {
           type: String
       }
    }],
   
    
});

OrderListSchema.methods.addFood = function (food) {

    var orderList = this;
    orderList.meals = orderList.meals.concat([{food}]);
   // orderList.meals = orderList.meals.concat([{food,user}]);
    orderList.save();
}  

OrderListSchema.methods.deleteFood = function (food) {
    
    var orderList = this;
    const filteredMeals = orderList.meals.filter ( (order) => {
        return (!(order.food == food));
    });
    
    if(filteredMeals.length !== orderList.meals.length) {
      orderList.meals = filteredMeals;
      orderList.save();
    }
    else {
        throw new Error('The item was not found in the database');
    }

}  



OrderListSchema.methods.deleteAllFood = function () {
    var orderList = this;
    orderList.meals = [];
    orderList.save();
  }
  else {
    throw new Error('The item was not found in the database');
  }

};

OrderListSchema.methods.deleteAllFood = function () {
  const orderList = this;
  orderList.orders = [];
  orderList.save();
};


const OrderList = mongoose.model('OrderList', OrderListSchema);


module.exports = { OrderList };


// var OrderListSchema = new mongoose.Schema({
//     restaurantId: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: String,
//     },
//     meals: [{
//        food: {
//            type: String
//        },
//        user: {
//            type: String
//        }
//     }],
   
    
// });


// OrderListSchema.methods.deleteFood = function (food, user) {
    
//     var orderList = this;
//     const filteredMeals = orderList.meals.filter ( (order) => {
//         return (!(order.food == food && order.user == user));
//     });
    
//     if(filteredMeals.length !== orderList.meals.length) {
//       orderList.meals = filteredMeals;
//       orderList.save();
//     }
//     else {
//         throw new Error('The item was not found in the database');
//     }

// }  