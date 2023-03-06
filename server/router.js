const express = require('express');
const {
  getUser,
  createUser,
  updateUser,
  sendRequest,
  sendReview,
  updateImages,
  getAllUsers,
} = require('./controllers/userController');

const {
  getTaglines,
  postTagline,
} = require('./controllers/taglineController');

const router = express.Router();

router.get('/getAllUsers', getAllUsers);
router.post('/getUser', getUser);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.post('/sendRequest', sendRequest);
router.post('/sendReview', sendReview);
router.post('/updateImages', updateImages);
router.get('/getTaglines', getTaglines);
router.post('/postTagline', postTagline);

module.exports = router;
