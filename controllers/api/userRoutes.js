const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({
        user: { id: userData.id, username: userData.username },
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred, please try again later." });
  }
});

router.post("/logout", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render("homepage");
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/newblog", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/blog/:id", withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedBlog) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/blog/:id", withAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedBlog) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
