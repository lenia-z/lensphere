const knex = require('knex')(require('../knexfile'));

// Get all gallery items
const getAllGalleryItems = async (req, res) => {
  try {
    const data = await knex.select('*').from('gallery');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gallery items', error: error });
  }
};

// Get gallery items for the authenticated user
const getUserGalleryItems = async (req, res) => {
  try {
    const userId = req.userData.id;
    const data = await knex('gallery').where('user_id', userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user gallery items', error: error });
  }
};

// Create a new gallery item
const createGalleryItem = async (req, res) => {
  try {
    const userId = req.userData.id;

    const newItem = {
      user_id: userId,
      description: req.body.description,
      image: `http://localhost:${process.env.PORT || 5050}/images/${req.file.filename}`
    };

    await knex('gallery').insert(newItem);

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error creating gallery item', error: error });
  }
};

// Update a gallery item
const updateGalleryItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.userData.id;

    const updates = {
      description: req.body.description,
    };

    await knex('gallery')
      .where('id', itemId)
      .where('user_id', userId)
      .update(updates);
    
    const updatedGalleryItem = await knex("gallery")
      .where("id", itemId)
      .where("user_id", userId)
      .first();

    res.status(200).json(updatedGalleryItem)
  } catch (error) {
    res.status(500).json({ message: 'Error updating gallery item', error: error });
  }
};

// Like a gallery item
const likeGalleryItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const galleryItem = await knex("gallery").where("id", itemId).first();

    if (!galleryItem) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }

    await knex("gallery")
      .where("id", itemId)
      .update({ likes: galleryItem.likes + 1 });

    const updatedGalleryItem = await knex("gallery")
      .where("id", itemId)
      .first();

    res.status(200).json(updatedGalleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Error liking gallery item', error: error });
  }
};

// Delete a gallery item
const deleteGalleryItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.userData.id;
    
    await knex('gallery')
      .where('id', itemId)
      .where('user_id', userId)
      .del();

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery item', error: error });
  }
};

module.exports = {
  getAllGalleryItems,
  getUserGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  likeGalleryItem,
  deleteGalleryItem,
};
