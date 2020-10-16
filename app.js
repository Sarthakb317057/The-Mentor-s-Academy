const express = require("express");
const path = require("path");// path is used for saving views file for pug
const app = express();// till now we just called the express files 
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/main', { useNewUrlParser: true });
const port = 80;// we set the value of port

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    concern: String
});

const logSchema = new mongoose.Schema({
    email: String,
    password: String
});

const signSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});

//model of mongoose
const Contact = mongoose.model('contactUs', contactSchema);

const log = mongoose.model('logIn', logSchema);

const sign = mongoose.model('signIn', signSchema);




// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug

app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('main.pug', params);
})

app.get('/log', (req, res) => {
    const params = {}
    res.status(200).render('log.pug', params);
})

app.get('/sign', (req, res) => {
    const params = {}
    res.status(200).render('sign.pug', params);
})

app.post('/:action', (req, res) => {

    if (req.param('action') === 'contact') {
        var mydata = new Contact(req.body);
        mydata.save().then(() => {
        res.render("main.pug")
        }).catch(() => {
        res.status(400).send("Item was not saved to Database");
        })
    }

    else if (req.param('action') === 'log') {
        var mydata = new log(req.body);
        mydata.save().then(() => {
        res.send("This Item has been Send to the Database")
        }).catch(() => {
        res.status(400).send("Item was not saved to Database");
        })
    }

    else if (req.param('action') === 'sign'){
        var mydata = new sign(req.body);
        mydata.save().then(() => {
        res.send("This Item has been Send to the Database")
        }).catch(() => {
        res.status(400).send("Item was not saved to Database");
    })
    }
    
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
