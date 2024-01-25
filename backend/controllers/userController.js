const userData = require("../models/userModule");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcryptjs');

const signup = async(req, res, next) => {
    const {username, password} = req.body;
    try {
        const exisitingUser = await userData.findOne({username});
        if(exisitingUser) {
            return res.status(400).json({error: "existing username"});
        }
        const hashedPassword = bcrypt.hashSync(password);
        const newUser = userData.create({
            username,
            password: hashedPassword,
        });
        const token = jwt.sign({ username : newUser.username}, SECRET_KEY, {expiresIn: "1h"});
        res.status(201).json({token});


    } catch (error) {
        res.status(500).send("error noob");
    }
};


const login = async(req,res,next) => {
    const {username, password} = req.body;
    try {
        const exisitingUser = await userData.findOne({username});
        if(!exisitingUser) {
            return res.status(401).json({error : "invalid creds lol"});
        }
        const isCorrectPassword = bcrypt.compareSync(password, exisitingUser.password);
        if(!isCorrectPassword) {
            return res.status(401).json({error : "invalid creds lol"});
        }
        const token = jwt.sign({id: exisitingUser._id}, SECRET_KEY, { expiresIn: "30s" });

        res.cookie(String(exisitingUser._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: "lax"
        });
        return res.status(200).json({token : token});
    }catch(error) {
        res.status(500).send("internal server error noob");
    }
};

const verifyToken = async (req, res, next) => {
    try {
        const cookies = await req.headers['cookie'];
        
        const token = cookies.split('=')[1];
        // const headers = req.headers['authorization'];
        // const token = headers.split(" ")[1];
        if(!token) {
            res.status(404).json({message: "no token found"});
        }
        jwt.verify(String(token), process.env.SECRET_KEY, (err, usr) => {
            if(err) {
                res.status(400).json({message: "invalid token"});
            }
            console.log(usr.id);
            req.id = usr.id;
        });
        next();
    }catch(error) {
        console.log(error);
    }
};


const getUser = async(req, res, next) => {
    try {
        const userId = req.id;
        console.log(userId);
        const user = await userData.findById(userId, "-password");

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
};

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.verifyToken = verifyToken;
