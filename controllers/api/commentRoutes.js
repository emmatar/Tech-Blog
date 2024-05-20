const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Oops, an error has occurred',
    });
  }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        title: req.body.title,
        time: req.body.time,
        patient_id: req.body.patient_id,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      },
    );
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Oops, an error has occurred',
    });
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Oops, an error has occurred',
    });
  }
});

module.exports = router;
