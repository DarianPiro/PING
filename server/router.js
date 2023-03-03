const express = require("express");
const {
  getAllUsers,
  getUser, 
  createUser,
  updateUser,
  deleteUser,
  sendRequest,
  updateImages
} = require("./controllers/userController"); 

const router = express.Router();

router.get('/users', getAllUsers);
router.post("/getUser", getUser);
router.post("/createUser", createUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);
router.post("/sendRequest", sendRequest);
router.post("/updateImages", updateImages);

module.exports = router;