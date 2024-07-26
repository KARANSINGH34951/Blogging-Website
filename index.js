require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// connect mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to DB'))
.catch((err) => console.log('DB connection error:', err));

// routes
const userRoute = require('./routes/user');
const blogRouter = require('./routes/blog');

// models
const Blog = require('./models/blog');

// middleware
const { checkForAuthCookie } = require('./middleware/authentication');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkForAuthCookie('token'));

app.get('/', async (req, res) => {
    try {
        const AllBlogs = await Blog.find({});
        res.render('home', { user: req.user, blogs: AllBlogs });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/user', userRoute);
app.use('/blog', blogRouter);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
