require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const User = require('./models/User');
const app = express();


// PARSER + CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(cookieParser());
app.use(bodyParser.json())


// MIDDLEWARE
const auth = (req, res, next) => {
    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken)
        return res.status(401).json({ message: 'No access token' });

    jwt.verify(accessToken, 'atoken', (err, user) => {
        if (err)
            return res.status(401).json({ message: 'Access token not valid' });
        req.user = user;
        next();
    })
}


// ROUTES
app.post('/login', async (req, res) => {
    const { name, password } = req.body.user;
    if (!name || !password)
        return res.status(400).json({ message: 'Field is empty' });

    const user = await User.findOne({ name });
    if (!user)
        return res.status(400).json({ message: 'User not found' });
    if (user.password !== password)
        return res.status(400).json({ message: 'Incorrect password' });

    const accessToken = jwt.sign({ _id: user._id }, 'atoken', { expiresIn: '1min' });
    const refreshToken = jwt.sign({ _id: user._id }, 'rtoken', { expiresIn: '10d' });
    const expiryDate = new Date(Number(new Date()) + 10 * 24 * 60 * 60 * 1000);
    return res.cookie('refreshToken', refreshToken, { maxAge: expiryDate, httpOnly: true, secure: true }).json({ accessToken });
})

app.get('/refresh', (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
        return res.status(401).json({ message: 'No refresh token' });

    jwt.verify(refreshToken, 'rtoken', (err, user) => {
        if (err)
            return res.status(401).json({ message: 'Refresh token not valid or expired' });

        const accessToken = jwt.sign({ _id: user._id }, 'atoken', { expiresIn: '1min' });
        const refreshToken = jwt.sign({ _id: user._id }, 'rtoken', { expiresIn: '10d' });
        const expiryDate = new Date(Number(new Date()) + 10 * 24 * 60 * 60 * 1000);
        return res.cookie('refreshToken', refreshToken, { maxAge: expiryDate, httpOnly: true, secure: true }).json({ accessToken });
    })
})

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


// LISTEN
app.listen(8080, () => {
    console.log("Running");
})


// DATABASE
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log("Connected"));