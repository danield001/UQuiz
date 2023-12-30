const router = require('express').Router();
const { User } = require('../../models/index');
const path = require('path');
const express = require('express'); // Import express

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email_address: req.body.email_address,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    console.log('Login route hit');
    try {
        const dbUserData = await User.findOne({
            where: {
                email_address: req.body.email_address
            },
        });
        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect Email or Password. Please Try Again' })
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Email or Password. Please Try Again' });
            return;
        }

        try {
            req.session.save(() => {
                req.session.loggedIn = true;
                console.log('Session saved successfully');
                res.status(200).json({ user: dbUserData, message: 'You Are Now Logged In' })
            });
        } catch (err) {
            console.error('Error saving session:', err);
            res.status(500).json(err);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});

app.get('/profile', (req, res) => {
    if (req.session.loggedIn) {
        const userId = req.session.userId;
        // Use the userId to fetch user-specific data or render the profile page
        res.render('profile', { userId });
    } else {
        // Redirect to the login page if the user is not logged in
        res.redirect('/login');
    }
});


module.exports = router;