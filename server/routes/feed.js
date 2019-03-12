const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/orders', feedController.getOrders);
router.post('/create', feedController.createOrder);

module.exports = router;