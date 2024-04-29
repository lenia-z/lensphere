const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery_controller');
const { authenticateWithJwt } = require('../middleware/auth');
const upload = require('../middleware/multer')

router.get('/', galleryController.getAllGalleryItems);

router.get('/user', authenticateWithJwt, galleryController.getUserGalleryItems);
router.route('/:id') // Gallery ID needed
  .put(authenticateWithJwt, galleryController.updateGalleryItem)
  .delete(authenticateWithJwt, galleryController.deleteGalleryItem);

router.post('/', authenticateWithJwt, upload.single('image'), galleryController.createGalleryItem);

module.exports = router;