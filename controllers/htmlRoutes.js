const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Display/render homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'user_id', 'description'],
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
    res.status(500).json({
      status: 'error',
      message: 'Sorry, a server error has occured',
    });
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    const blogs = blogData.get({ plain: true });
    res.render('blog', {
      ...blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Sorry, a server error has occured',
    });
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Blog,
          attributes: ['id', 'user_id', 'header', 'description'],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({
      status: err,
      message: 'Sorry, a server error has occured',
    });
  }
});

// render signup page
router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('login');
});

module.exports = router;
