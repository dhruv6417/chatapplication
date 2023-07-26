const express = require("express");
const {registerUser,authUser,allUsers, retrieveuser}=require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect,allUsers);
router.post("/",registerUser);
router.post("/login",authUser);
router.get("/:id",retrieveuser)

module.exports = router;