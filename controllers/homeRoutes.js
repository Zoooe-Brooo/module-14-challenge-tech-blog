const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/user/" + req.session.user_id);
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    const user_id = req.session.user_id;
    res.redirect("/user/" + user_id);
    return;
  }

  res.render("signup");
});

router.get("/user/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:id/newblog", withAuth, async (req, res) => {
  res.render("new-blog", {
    logged_in: req.session.logged_in,
  });
});

router.get("/user/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render("edit-blog", {
        ...blog,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_content", "date_created"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
