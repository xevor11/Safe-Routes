const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};
