const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
    res.status(200);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email.user.email });
    res.send(data);
    res.status(200);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body)
    const data = new User(req.body);
    await data.save();
    res.send(data);
    res.status(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const username = req.body.username;
    data = await User.findOneAndUpdate({ username: username }, req.body);
    res.send(data);
    res.status(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

