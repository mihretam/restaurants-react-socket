var {Restaurant} = require('./../models/restaurant');
var {OrderList} = require('./../models/orderList');

const _ = require('lodash');

export async function addRestaurant(req, res, next) {
    var body = _.pick(req.body, ['restaurantName', 'workingHours', 'restaurantLink']); 
    var restaurant = new Restaurant (body);

    return restaurant.save().then( (savedRestaurant) => {
        res.status(200).send(savedRestaurant);
        next();
    }, (err) => { res.status(400).send(err)});

}


export async function deleteRestaurant(req, res, next) {
    const id = req.body.restaurantId;

    OrderList.deleteMany({restaurantId: id}).then( (orderLists) => {
     console.log("Removed order lists", orderLists);     
    }).catch( (err) => { console.log(err); });

    Restaurant.findByIdAndDelete(id).then( (restaurant) => {
        res.status(200).send(restaurant);
    }).catch( (err) => { res.status(400).send(err); });
}



export async function getRestaurantList(req, res, next) {
    
    Restaurant.find({}).then( (restaurants) => {
      res.status(200).send(restaurants);
      next();
    }).catch( (err) => res.status(400).send(err));

}



// export async function getRestaurantId(req, res, next) {
    

//     Restaurant.findOne({restaurantName: req.body.restaurantName}).then( (restaurant) => {

//         if(!restaurant) {
//           res.status(404).send({error: 404 , message: 'Restaurant not found'});
//         }  

//       res.status(200).send(restaurant._id);
//       next();

//     }).catch( (err) => res.status(400).send(err));
 
// }
