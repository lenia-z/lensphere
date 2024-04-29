const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events_controller');
const { authenticateWithJwt } = require('../middleware/auth');

router.get('/', eventsController.getAllEvents);

router.use(authenticateWithJwt);

router.get('/user', eventsController.getUserEvents);
router.post('/', eventsController.createEvent);
router.route('/:id') // Event id needed
  .put(eventsController.updateEvent)
  .delete(eventsController.deleteEvent);

module.exports = router;