const mongoose = require('mongoose');

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
           type: String,
           
       }
   }]

});

OrderListSchema.methods.addFood = function (food) {
    
    var orderList = this;
    orderList.orders = orderList.orders.concat([{food}]);

    orderList.save();
}  


OrderListSchema.methods.deleteFood = function (food) {
    
    var orderList = this;
    orderList.orders.splice(orderList.orders.indexOf({food}), 1);

    orderList.save();
}  

OrderListSchema.methods.deleteAllFood = function () {
    var orderList = this;
    orderList.orders = [];
    orderList.save();
}  


var OrderList = mongoose.model('OrderList', OrderListSchema);


module.exports = { OrderList };
