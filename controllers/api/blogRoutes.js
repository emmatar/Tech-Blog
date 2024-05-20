const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a blog
router.post('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Oops, an error has occurred',
    });
  }
});
// Update a blog
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      },
    );
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Oops, an error has occurred',
    });
  }
});
// Delete a blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Oops, an error has occurred',
    });
  }
});

module.exports = router;
