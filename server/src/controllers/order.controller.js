const { OrderList } = require('./../models/orderList');
const { Restaurant } = require('./../models/restaurant');

import User from '../models/user';
const _ = require('lodash');

export async function addOrderList(req, res, next) {
    Restaurant.findById(req.body.restaurantId).then( (restaurant) => {
        if(!restaurant) {
            res.status(404).send({message: 'The restaurant does not exist in the database'});
        }
        var orderList = new OrderList ({
            restaurantId: req.body.restaurantId,
            date: new Date().toISOString().substring(0,10)
        });

        orderList.save().then( (savedOrderList) => {
            res.status(200).send(savedOrderList);
            next();
        }).catch( (err) => res.status(400).send(err) );
    });

    orderList.save().then((savedOrderList) => {
      res.status(200).send(savedOrderList);
      next();
    }).catch(err => res.status(400).send(err));
  });
}
export async function deleteOrderList(req, res, next) {
    OrderList.findById(req.body.orderListId).then( (orderList) => {
        if(!orderList) {
            res.status(404).send({message: 'The order list does not exist in the database'});
        }
        orderList.closed = true;
        orderList.save().then( () => {
            res.status(200).send("Succesfully deleted!");
            next();
        }).catch( (err) => res.status(400).send(err) );
    });
}


export async function addFood(req, res, next) {
    const id = req.body.orderListId;
    OrderList.findById(id).then( (orderList) => {
        if(!orderList) {
            res.status(404).send({message: 'OrderList not found'});
        }
        orderList.addFood(req.body.food);
        res.status(200).send('Added food successfully');
        next();
    }).catch( (err) => res.status(400).send(err) );

}


export async function deleteFood(req, res, next) {
    const id = req.body.orderListId;
    OrderList.findById(id).then( (orderList) => {
        if(!orderList) {
            res.status(404).send({message: 'OrderList not found'});
        }
       
       // orderList.deleteFood(req.body.food, req.user.fullName);
        orderList.deleteFood(req.body.food);
        res.status(200).send('Deleted food successfully');
        next();
    }).catch( (err) => res.status(400).send(err) );
}

export async function deleteAllFood(req, res, next) {
  const id = req.body.orderListId;
  OrderList.findById(id).then((orderList) => {
    if (!orderList) {
      res.status(404).send({ message: 'OrderList not found' });
    }
    orderList.deleteAllFood();
    res.status(200).send('Deleted');
    next();
  }).catch(err => res.status(400).send(err));
}

export async function getOrderListsByDate(req, res, next) {
    const date = req.params.date;
    OrderList.find({date, closed: false}).then( (orderLists) => {
        res.status(200).send(orderLists);
        next();
    }).catch( (err) => res.status(400).send(err) );
}


// export async function addFood(req, res, next) {
//     const id = req.body.orderListId;
//     OrderList.findById(id).then( (orderList) => {
//         if(!orderList) {
//             res.status(404).send({message: 'OrderList not found'});
//         }
//         orderList.addFood(req.body.food, req.user.fullName);
//         res.status(200).send('Added food successfully');
//         next();
//     }).catch( (err) => res.status(400).send(err) );
// }

  
//export async function getAllOrderLists(req, res, next) {

// export async function getAllOrderLists(req, res, next) {

//     OrderList.find({}).then( (orderLists) => {
//         res.status(200).send(orderLists);
//         next();
//     }).catch( (err) => res.status(400).send(err));

// }

