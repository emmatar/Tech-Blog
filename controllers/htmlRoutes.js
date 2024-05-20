// ROUTES FOR HTML TEMPLATES
const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get main HTML page
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['description', 'id', 'user_id'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// render login page
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('login');
});
// render dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Blog,
          attributes: ['title', 'body', 'id', 'user_id'],
        },
      ],
    });
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Oops, a server error!',
    });
  }
});
// render signup page
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// get blog by id
router.get('/blogs/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    const blog = blogData.get({ plain: true });
    res.render('blog', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
