const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const jwt = require('jsonwebtoken');
dotenv.config();
const router = express.Router();

app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());
const userData = require("./models/userModule.js");

mongoose.connect(process.env.URI)
.then(() => {
    console.log("successfully connected");
    app.listen(process.env.PORT || 5000, (err) => {
        if(err) console.log(err);
        console.log("running on port : ", process.env.PORT);
    });    
})
.catch((error) => {
    console.log("faileld to connect : ", error);
});

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

router.post("/signup", async(req, res) => {
    const {username, password} = req.body;
    try {
        const exisitingUser = await userData.findOne({username});
        if(exisitingUser) {
            return res.status(400).json({error: "existing username"});
        }

        const newUser = userData.create({
            username,
            password: password,
        });
        const token = jwt.sign({ username : newUser.username}, SECRET_KEY, {expiresIn: "1h"});
        res.status(201).json({token});
    } catch (error) {
        res.status(500).send("error noob");
    }
});

router.post("/login", async(req,res) => {
    const {username, password} = req.body;
    try {
        const exisitingUser = await userData.findOne({username});
        if(!exisitingUser) {
            return res.status(401).json({error : "invalid creds lol"});
        }

        if(exisitingUser.password != password) {
            return res.status(401).json({error : "invalid creds lol"});
        }
        const token = jwt.sign({username: exisitingUser.username}, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({token, userId:exisitingUser._id});
    }catch(error) {
        res.status(500).send("internal server error");
    }
});

router.get("/user/:userId", async(req, res) => {
    try {
        const userId = req.params.userId;

        const user = await userData.findById(userId);

        if(!user) {
            console.log("no user found");
            return res.status(404).json({error: "user not found"});
        }

        const userDataRes = {
            username: user.username,
        };
        res.status(200).json(userDataRes);
    }catch (error) {
        res.status(404).json({error: "internal server error"});
    }
});


app.use("/", router);