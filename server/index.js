require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const User = require('./models/User');
const app = express();


// PARSER + CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,authorization');
    next();
});
app.use(bodyParser.json())


// MIDDLEWARE
const auth = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'No token' });

    jwt.verify(token, 'token', (err, user) => {
        if (err)
            return res.status(400).json({ message: 'Token not valid' });
        req.user = user;
        next();
    })
}


// ROUTES
app.get('/users/:name', auth, async (req, res) => {
    try {
        const users = await User.findOne({ name: req.params.name });
        res.json(users);
    } catch {
        res.status(404).json({ message: 'User not found' });
    }
})

app.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.post('/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });

    user.save()
        .then(() => {
            res.json({ message: 'User created' })
        })
        .catch((err) => res.status(500).json({ message: err.message }))
})

app.post('/login', async (req, res) => {
    const { name, password } = req.body.user;
    if (!name || !password)
        return res.status(400).json({ message: 'Field is empty' });

    const user = await User.findOne({ name });
    if (!user)
        return res.status(400).json({ message: 'User not found' })
    if (user.password !== password)
        return res.status(400).json({ message: 'Incorrect password' })

    return res.json({ token: jwt.sign({ id: user._id }, 'token', { expiresIn: '5min' }) });
})


// LISTEN
app.listen(8080, () => {
    console.log("Running");
})


// DATABASE
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log("Connected"));