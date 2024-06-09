const express = require('express');
const mong = require('mongoose');
const RouteOne = require('./Route');
const Cors = require('cors');
const dotenv = require("dotenv");
const PassPort = require('passport');
const CookieSession = require('cookie-session');

const app = express();

const paymentRoute = require('./controller/payment');
const passportSetup = require("./controller/passport");
const authRoute = require("./controller/auth");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(CookieSession({ name: "session", keys: ["edureka"], maxAge: 24 * 60 * 60 * 1000 }))

dotenv.config();

app.use(exp.json());
app.use(PassPort.initialize());
app.use(PassPort.session());
app.use(Cors(corsOptions));
app.use('/', RouteOne);
app.use('/api/payment/', paymentRoute)
app.use('/auth', authRoute);

// const dbUrl = "mongodb://127.0.0.1:27017/mongo1";
const atlasUrl = "mongodb+srv://code:NbtMDO032UHx2y2a@cluster0.pbwkm6s.mongodb.net/zomatoApp?retryWrites=true&w=majority&appName=Cluster0";
mong.connect(atlasUrl)
    .then(res => {
        app.listen((3103), () => {
            console.log("server started on 3103")
        })
    }).catch((err) => {
        console.log("server error: " + err)
    })