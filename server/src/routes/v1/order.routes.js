import { Router } from 'express'
import * as OrderController from '../../controllers/order.controller'
import authenticate from '../../helpers/authenticate';


const router = new Router()

router.route('/add-order-list').post( OrderController.addOrderList);
router.route('/order-lists/:date').get(OrderController.getOrderListsByDate);
router.route('/delete-order-list').delete( OrderController.deleteOrderList);
router.route('/add-food').post( OrderController.addFood);
router.route('/delete-food').delete( OrderController.deleteFood);
router.route('/delete-all-food').delete( OrderController.deleteAllFood);

//router.route('/all-order-lists').get(OrderController.getAllOrderLists);
//router.route('/get-order-list/:id').get(OrderController.getOrderList);

export default router;
