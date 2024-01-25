const express = require("express");
const router = express.Router();
const { signup, login, getUser, verifyToken } = require("../controllers/userController");
const userData = require("../models/userModule");

router.get("/", (req, res) => {
    res.send("app is running hahahaha noob");
});

router.get("/allusers", async(req, res) => {
    try {
        const allUsers = await userData.find();
        res.status(200).send(allUsers);
    }catch(error) {
        res.status(500).send("there is an internal error");
    }
    
})

router.post("/signup", signup);

router.post("/login", login);

router.get("/user", verifyToken ,getUser);


module.exports = router;