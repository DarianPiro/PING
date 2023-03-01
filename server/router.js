const express = require("express");
const {
  getAllUsers,
  getUser, 
  createUser,
  updateUser
} = require("./controllers/userController"); 

const router = express.Router();

router.get('/users', getAllUsers);
router.post("/getUser", getUser);
router.post("/createUser", createUser);
router.put("/updateUser", updateUser);

module.exports = router;