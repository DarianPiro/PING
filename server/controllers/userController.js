const User = require('../models/User');

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
    const { socketID, username, role } = req.body;
    const data = await User.findOneAndUpdate(
      { socketID: socketID },
      { username: username, role: role },
      { new: true }
    );
    res.send(data);
    console.log(data);
    res.status(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.sendRequest = async (req, res) => {
  try {
    const { username, content, type, status } = req.body;
    const data = await User.findOneAndUpdate(
      { username: username },
      {
        $push: {
          requests: {
            content: content,
            type: type,
            status: status,
            date: new Date(),
          },
        },
      }
    );
    res.send(data);
    res.status(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.sendReview = async (req, res) => {
  try {
    const { _id, helper, rating, review } = req.body;
    const data = await User.findOneAndUpdate(
      { 'requests._id': _id },
      {
        $push: {
          'requests.$.reviews': {
            helper: helper,
            rating: rating,
            review: review,
          },
        },
      }
    );
    res.send(data);
    res.status(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateImages = async (req, res) => {
  try {
    const { username, image } = req.body;
    const user = await User.findOneAndUpdate(
      { username: username },
      {
        $push: { 'requests.$[elem].images': { $each: [image], $position: 0 } },
      },
      { arrayFilters: [{ 'elem.images': { $exists: true } }], new: true }
    );
    res.send(user);
    res.status(201);
  } catch (error) {
    console.log('this is the line', error);
    res.status(500).send({ error: error.message });
  }
};
