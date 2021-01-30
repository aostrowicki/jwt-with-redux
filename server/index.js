require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const User = require('./models/User');
const e = require('express');
const app = express();


// PARSER + CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});
app.use(bodyParser.json())


// MIDDLEWARE
const auth = (req, res, next) => {
    let token = req.headers['authorization']?.split(' ')[1];

    jwt.verify(token, 'token', (err, user) => {
        if (!err) {
            req.user = user;
            next();
        } else {
            return res.json({ message: 'User not authenticated' })
        }
    })
}


// ROUTES
app.get('/users/:name', auth, async (req, res) => {
    try {
        const users = await User.findOne({ name: req.params.name });
        res.json(users);
    } catch {
        res.error('error');
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch {
        res.error('error');
    }
})

app.post('/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });

    user.save()
        .then(() => {
            res.json('User created')
        })
        .catch(() => { res.error(error) })
})

app.post('/login', async (req, res) => {
    const user = req.body.user;

    if (!user) return res.json({ message: 'Body is empty' });
    const find = await User.findOne({ name: user.name });

    const resp = find ? find.password === user.password ?
        { token: jwt.sign(user, 'token', { expiresIn: '5min' }), user }
        : { message: 'Incorrect password' }
        : { message: 'User not found' };

    return res.json(resp);
})


// LISTEN
app.listen(8080, () => {
    console.log("Running");
})


// DATABASE
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log("Connected"));