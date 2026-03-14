const router = require('express').Router();
const userController = require('../controllers/userController');
const requireAuth = require("../middleware/requireAuth")
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);
router.get('/validate-token', requireAuth, (req, res) => {
    res.status(200).json({
        valid: true,
        message: 'Token is valid',
        user: req.user
    });
});
module.exports = router;