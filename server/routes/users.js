const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const { authenticateWithJwt } = require('../middleware/auth');

router.get('/', usersController.getUsersProfile);
router.get("/me", authenticateWithJwt, usersController.getCurrentUserProfile);
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.put('/update-profile', authenticateWithJwt, usersController.updateProfile);
router.put("/change-password", authenticateWithJwt, usersController.changePassword);

module.exports = router;
