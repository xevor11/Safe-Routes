const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create user.' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to get users.' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ error: 'User not found.' });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to get user.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!user) {
      res.status(404).send({ error: 'User not found.' });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update user.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send({ error: 'User not found.' });
    }
    res.send({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to delete user.' });
  }
};
