const knex = require('knex')(require('../knexfile'));

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const data = await knex('events').select('*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error });
  }
};

// Get events created by the authenticated user
const getUserEvents = async (req, res) => {
  try {
    const userId = req.userData.id;

    const data = await knex('events')
      .where('user_id', userId)
      .select('*');
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user events', error });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const userId = req.userData.id;

    const newEvent = {
      user_id: userId,
      title: req.body.title,
      description: req.body.description,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      address: req.body.address,
      date: req.body.date,
    };

    await knex('events').insert(newEvent);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const userId = req.userData.id;
    const eventId = req.params.id;

    const updates = {
      titel: req.body.title,
      description: req.body.description,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      address: req.body.address,
      date: req.body.date,
    };
    
    await knex('events')
      .where('id', eventId)
      .where('user_id', userId)
      .update(updates);
    
    const updatedEvent = await knex("gallery")
      .where("id", eventId)
      .where("user_id", userId)
      .first();

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Like an event
const likeEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const eventItem = await knex("events").where("id", eventId).first();

    if (!eventItem) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    await knex("events")
      .where("id", eventId)
      .update({ likes: eventItem.likes + 1 });

    const updatedEvent = await knex("events")
      .where("id", eventId)
      .first();

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error liking event', error });
  }
};

// Delete an existing event
const deleteEvent = async (req, res) => {
  try {
    const userId = req.userData.id;
    const eventId = req.params.id;

    await knex('events')
      .where('id', eventId)
      .where('user_id', userId)
      .del();
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

module.exports = {
  getAllEvents,
  getUserEvents,
  createEvent,
  updateEvent,
  likeEvent,
  deleteEvent,
};
