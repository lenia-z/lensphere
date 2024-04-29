const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Define the signup function to create new users
const signup = async (req, res) => {
  // Extract user data from request body and validate the data
  const first_name = validator.trim(req.body.first_name);
  const last_name = validator.trim(req.body.last_name);
  const username = validator.trim(req.body.username);
  const email = validator.trim(req.body.email);
  const password = req.body.password;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // Check uniqueness for username and email
    const doesUsernameExist = await knex('users').where({ username }).first();
    const doesEmailExist = await knex('users').where({ email }).first();

    if (doesUsernameExist) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    if (doesEmailExist) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the user's password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await knex('users').insert({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
    });

    // Respond with success message
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error creating new user', error: error });
  }
};

// Define the login function for authenticating users
const login = async (req, res) => {
  // Extract the credentials, trim and validate
  const identifier = validator.trim(req.body.identifier);
  const password = req.body.password;

  try {
    // Check if the loginField is an email or a username
    const queryObject = validator.isEmail(identifier)
      ? { email: identifier }
      : { username: identifier };

    // Check if user exists in the database
    const user = await knex('users').where(queryObject).first();

    // Verify the provided password against the stored hash
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Authentication failed
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }

    // Password is correct, create the JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with the JWT token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error });
  }
};

// Define the updateProfile function for updating user information
const updateProfile = async (req, res) => {
  // Extract userId from authentication middleware
  const userId = req.userData.id;
  // Extract and trim updated profile data from the request body
  const first_name = validator.trim(req.body.first_name);
  const last_name = validator.trim(req.body.last_name);
  const username = validator.trim(req.body.username);
  const email = validator.trim(req.body.email);

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const doesUsernameExist = await knex('users')
      .whereNot({ id: userId })
      .andWhere({ username })
      .first();
    const doesEmailExist = await knex('users')
      .whereNot({ id: userId })
      .andWhere({ email })
      .first();

    if (doesUsernameExist) {
      return res.status(409).json({ message: 'Username already exist' });
    }
    if (doesEmailExist) {
      return res.status(409).json({ message: 'Email already exist' });
    }

    // Update user profile in the database
    await knex('users').where({ id: userId }).update({
      first_name,
      last_name,
      username,
      email,
    });

    // Respond with success message
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error });
  }
};

const changePassword = async (req, res) => {
  // Extract user id from the token
  const userId = req.userData.id;
  // Extract the new password from the request body
  const newPassword = req.body.password;

  // Validate the new password
  if (
    !validator.isStrongPassword(newPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    return res
      .status(400)
      .json({ message: 'Password does not meet complexity requirements' });
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await knex('users').where({ id: userId }).update({
      password: hashedPassword,
    });

    // Respond with success message
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error });
  }
};

module.exports = {
  signup,
  login,
  updateProfile,
  changePassword,
};
