import { Router } from 'express'
import * as RestaurantController from '../../controllers/restaurant.controller'

const router = new Router()

router.route('/add-restaurant').post(RestaurantController.addRestaurant);
router.route('/restaurant-list').get(RestaurantController.getRestaurantList);
//router.route('/restaurant-id').get(RestaurantController.getRestaurantId);


export default router
