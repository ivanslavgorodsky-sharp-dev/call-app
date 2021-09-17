import path from 'path';
import {login, register, getToken} from './controllers/user';
import { addContact, deleteContact, getContacts } from './controllers/contact';
import { makeTransaction, getBalance } from './controllers/transaction';

const config = require("./twilio/config");
const express = require("express");
const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const hbs = require("hbs");
const app = express();
const server = require('http').createServer(app);
const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);

app.engine("hbs", expressHbs(
	{
		layoutsDir: "views/layouts", 
		defaultLayout: "layout",
		extname: "hbs"
	}
));
app.set("view engine", "hbs");

// middleware
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home.hbs", {
		title: "HOME",
	});
});
app.get("/login", function(req, res){
    res.render("login.hbs", {
		title: "LOGIN",
	});
});
app.post("/login", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    if (password.length < 3) {
        return res.json ({ result: null, error: "Password is too short"});
    }
    if (!emailRe.test(String(email).toLowerCase())) {
        return res.json ({ result: null, error: "Invalid email"});
    }

    const user = await login(email, password);
    return res.json({result: user.result, error: user.error});
});

app.get("/register", function(req, res){
    res.render("register.hbs", {
		title: "REGISTRATION",
	});
});

app.post("/register", async function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (password.length < 3) {
        return res.json ({ result: null, error: "Password is too short"});
    }
    if (!emailRe.test(String(email).toLowerCase())) {
        return res.json ({ result: null, error: "Invalid email"});
    }

    const user = await register (name, email, password);
    return res.json({result: user.result, error: user.error});
});

/*
    WEBHOOK for TwiML commands
*/
app.post ("/voice", (req, res) => {
    const { VoiceResponse } = require("twilio").twiml;
    const To = req.body.To;
    const response = new VoiceResponse();
    const dial = response.dial({ callerId: config.twilio.callerId });
    dial.number({}, To);
    res.set("Content-Type", "text/xml");
    res.send(response.toString());
});
/////// API /////
app.get ("/balance", async function (req, res) {
    let userId = req.query.id;
    if ( /^[0-9a-z]{24}$/.test(userId) === false)
        return res.json ({ result: null, error: "Incorrect ID"});
    
    const balance = await getBalance (userId);
    return res.json ({result: balance.result, error: balance.error});
});
app.get ("/checkout", async function (req, res) {
    let userId = req.query.id;
    if ( /^[0-9a-z]{24}$/.test(userId) === false)
        return res.json ({ result: null, error: "Incorrect ID"});

    const transaction = await makeTransaction (userId, -0.25);
    if (transaction._id)
        return res.json ({result: "Success", error: ""});

    return res.json ({result: "Fail", error: "Failed to add transaction"});    
});
app.post ("/pay", async function (req, res) {
    try {
        let intent;
        const userId = req.body.userId;
        const paymentMethodId = req.body.id;
        
        if ( /^[0-9a-z]{24}$/.test(userId) === false)
            return res.json ({ result: null, error: "Incorrect ID"});
    
        if (paymentMethodId) {
          intent = await stripe.paymentIntents.create({
            payment_method: paymentMethodId,
            amount: 1000,
            currency: 'usd',
            confirmation_method: 'manual',
            confirm: true
          });
        }

        if (intent.status === "succeeded") {
            const transaction = await makeTransaction (userId, 9.41);
            if (transaction._id)
                return res.json ({result: "Success", error: ""});

            return res.json ({result: "Fail", error: "Failed to add transaction"});
        }

        return res.json ({result: null, error: "Payment failure!"});
      } catch (e) {
        return res.json ({result: null, error: e.message});
      }
});

app.get ("/contacts", async function (req, res) {
    let userId = req.query.id;
    if ( /^[0-9a-z]{24}$/.test(userId) === false)
        return res.json ({ result: null, error: "Incorrect ID"});
    
    const contacts = await getContacts(userId);
    return res.json ({result: contacts.result, error: contacts.error});
});
app.post ("/contacts", async function (req, res) {
    const userId = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;
    if (name.length < 3)
        return res.json ({ result: null, error: "Incorrect name"});
    if (name.phone < 3)
        return res.json ({ result: null, error: "Incorrect phone"});
    if ( /^[0-9a-z]{24}$/.test(userId) === false)
        return res.json ({ result: null, error: "Incorrect ID"});
    
    const contacts = await addContact (userId, name, phone);
    return res.json ({result: contacts.result, error: contacts.error});
});
app.delete ("/contacts", async function (req, res) {
    const contactId = req.query.id;
    if ( /^[0-9a-z]{24}$/.test(contactId) === false)
        return res.json ({ result: null, error: "Incorrect ID"});

    const contacts = await deleteContact(contactId);
    return res.json ({result: contacts.result, error: contacts.error});
});
////////////////////////////////////////////////////////////////
app.post ("/voice/token", async function (req, res) {
    const userId = req.body.id;
    if ( /^[0-9a-z]{24}$/.test(userId) === false)
        return res.json ({ result: null, error: "Incorrect ID"});

    const token = await getToken (userId);
    return res.json ({result: token.result, error: token.error});
});

app.use(function (req, res, next) {
	res
		.status(404)
		.render("404.hbs", {
			title: "404 !Not found! 404"
		});
});

mongoose.connect(
    process.env.MONGODB_CONNECTION + process.env.MONGODB_DB_NAME,
    { useUnifiedTopology: true, useNewUrlParser: true },
    function(err){
        if(err) 
            return console.log(err);

        console.log("DB connected.");
        server.listen(process.env.SERVER_PORT, function(){
            console.log("Server listen port: " + process.env.SERVER_PORT);
        });
});
