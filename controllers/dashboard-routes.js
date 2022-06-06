// Import Required Packages & Files
const router = require("express").Router();
const withAuth = require("../utils/auth");

// Import Required Models
const { User, Post, Comment } = require("../models");

// Get All Posts for Dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit Post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("edit-post", {
      post,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    loggedIn: true,
  });
});

module.exports = router;
