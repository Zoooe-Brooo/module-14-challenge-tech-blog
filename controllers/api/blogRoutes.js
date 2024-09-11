const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// add comments for one blog
router.post("/:id", withAuth, async (req, res) => {
  console.log(req.body);

  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
