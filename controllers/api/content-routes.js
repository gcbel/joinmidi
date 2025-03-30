/* DEPENDENCIES */
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

/* Post route to /api/content/post, creates a new post */
router.post("/post", async (req, res) => {
  try {
    // Get user
    const user = await User.findOne({
      where: { username: req.session.username },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new post
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
      user_id: user.id,
    });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create a new post.", error: err });
  }
});

/* Put route to /api/content/post/id, updates a post */
router.put("/post/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(400).json({ message: "No such post." });
    }

    // Update a post
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
      },
      { where: { id: req.params.id } }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post.", error: err });
  }
});

/* Delete route to /api/content/pst/:id, deletes a post */
router.delete("/post/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).json({ message: "No such post." });
    }

    // Ensure user created this post
    const user = await User.findOne({
      where: { username: req.session.username },
    });
    if (!user || user.id !== post.user_id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    // Destroy associated comments, then destroy post
    await Comment.destroy({
      where: { post_id: post.id },
    });
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete the post.", error: err });
  }
});

/* Post route to /api/content/comment, creates a new comment */
router.post("/comment", async (req, res) => {
  try {
    // Get user
    const user = await User.findOne({
      where: { username: req.session.username },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new comment
    const comment = await Comment.create({
      content: req.body.content,
      date: new Date(),
      user_id: user.id,
      post_id: req.body.post_id,
    });

    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create a new comment.", error: err });
  }
});

/* Delete route to /api/content/comment/:id, deletes a comment */
router.delete("/comment/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res.status(404).json({ message: "No such comment." });
    }

    // Ensure user created this comment
    const user = await User.findOne({
      where: { username: req.session.username },
    });
    if (!user || user.id !== comment.user_id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    await comment.destroy();
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to delete the comment.", error: err });
  }
});

/* EXPORTS */
module.exports = router;
