const mongoose = require('mongoose');
const _ = require('lodash');


var OrderListSchema = new mongoose.Schema({
    restaurantId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    orders: [{
       food: {
           type: String
       },
       user: {
           type: String
       }
    }],
   
    
});

OrderListSchema.methods.addFood = function (food, user) {

    var orderList = this;
    orderList.orders = orderList.orders.concat([{food,user}]);
    orderList.save();
}  


OrderListSchema.methods.deleteFood = function (food, user) {
    
    var orderList = this;
    const filteredOrders = orderList.orders.filter ( (order) => {
        return (!(order.food == food && order.user == user));
    });
    console.log('filtered', filteredOrders);
    console.log('original', orderList.orders);
    if(filteredOrders.length !== orderList.orders.length) {
      orderList.orders = filteredOrders;
      orderList.save();
    }
    else {
        throw new Error('The item was not found in the database');
    }

}  

OrderListSchema.methods.deleteAllFood = function () {
    var orderList = this;
    orderList.orders = [];
    orderList.save();
}  


var OrderList = mongoose.model('OrderList', OrderListSchema);


module.exports = { OrderList };
