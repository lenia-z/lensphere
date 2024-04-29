import axios from "axios";

const BASE_URL = process.env.REACT_APP__URL || "http://localhost:5050";

const Lensphere_API = {
  // Get users non-sensitive info
  async getUsersProfile() {
    return await axios.get(`${BASE_URL}/users`);
  },

  // Get users non-sensitive info
  async getCurrentUserProfile() {
    const token = localStorage.getItem("token");
    return await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
  // Create new user
  async signup(userData) {
    return await axios.post(`${BASE_URL}/users/signup`, userData);
  },

  // Login
  async login(credentials) {
    return await axios.post(`${BASE_URL}/users/login`, credentials);
  },

  // Update user profile
  async updateUserProfile(profileData) {
    const token = localStorage.getItem("token");
    return await axios.put(`${BASE_URL}/users/update-profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Change password
  async changeUserPassword(passwordData) {
    const token = localStorage.getItem("token");
    return await axios.put(`${BASE_URL}/users/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Get all gallery items
  async getAllGalleryItems() {
    return await axios.get(`${BASE_URL}/gallery`);
  },

  // Get user's gallery items
  async getUserGalleryItems() {
    const token = localStorage.getItem("token");
    return await axios.get(`${BASE_URL}/gallery/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Create a gallery item
  async createGalleryItem(newGallery) {
    const token = localStorage.getItem("token");
    return await axios.post(`${BASE_URL}/gallery`, newGallery, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Update a gallery item
  async updateGalleryItem(itemId, galleryData) {
    const token = localStorage.getItem("token");
    return await axios.put(`${BASE_URL}/gallery/${itemId}`, galleryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Delete a gallery item
  async deleteGalleryItem(itemId) {
    const token = localStorage.getItem("token");
    return await axios.delete(`${BASE_URL}/gallery/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Get all events
  async getAllEvents() {
    return await axios.get(`${BASE_URL}/events`);
  },

  // Get user's events
  async getUserEvents() {
    const token = localStorage.getItem("token");
    return await axios.get(`${BASE_URL}/events/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Create an event
  async createEvent(eventData) {
    const token = localStorage.getItem("token");
    return await axios.post(`${BASE_URL}/events`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Update an event
  async updateEvent(eventId, updateData) {
    const token = localStorage.getItem("token");
    return await axios.put(`${BASE_URL}/events/${eventId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Delete an event
  async deleteEvent(eventId) {
    const token = localStorage.getItem("token");
    return await axios.delete(`${BASE_URL}/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default Lensphere_API;