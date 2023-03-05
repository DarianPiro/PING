const express = require('express');
const {
  getUser,
  createUser,
  updateUser,
  sendRequest,
  sendReview,
  updateImages,
} = require('./controllers/userController');

const router = express.Router();

router.post('/getUser', getUser);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.post('/sendRequest', sendRequest);
router.post('/sendReview', sendReview);
router.post('/updateImages', updateImages);

module.exports = router;
