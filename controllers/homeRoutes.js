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
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
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

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Blog, order: [["date_created", "ASC"]] }],
    });

    if (!userData) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newblog", withAuth, async (req, res) => {
  console.log("new blog route hit");
  res.render("new-blog", {
    logged_in: req.session.logged_in,
  });
  // } catch (err) {
  //   console.error("Failed to render new blog page:", err);
  //   res.status(500).json({ message: "Failed to load new blog page." });
  // }
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

    console.log(blog);

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
