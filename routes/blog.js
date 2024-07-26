const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { checkForAuthCookie } = require('../middleware/authentication');
const Blog = require('../models/blog');
const Comment= require("../models/comment")

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Route to render the blog creation form
router.get('/create', checkForAuthCookie('token'), (req, res) => {
  if (!req.user) {
    return res.redirect('/login'); // Ensure user is authenticated
  }
  return res.render('createblog', { user: req.user });
});

// Route to handle blog creation
router.post('/', checkForAuthCookie('token'), upload.single('coverImageUrl'), async (req, res) => {
  
  // console.log(req.user);
  
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { title, body } = req.body;
  
  try {
    const blog = await Blog.create({
      title,
      body,
      coverImageUrl: `uploads/${req.file.filename}`,
      createdBy: req.user.id
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get a blog by its ID
router.get('/:id', checkForAuthCookie('token'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")
    // console.log('Blog:', blog); 
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.render('blog', { blog, user: req.user,comments });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user.id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
