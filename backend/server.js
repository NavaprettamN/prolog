const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
const userDataRouter = require("./Routes/UserDataRouter");

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());

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

app.use(userDataRouter);