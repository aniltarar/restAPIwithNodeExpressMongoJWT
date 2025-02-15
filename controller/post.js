const Post = require("../models/post.js"); // Post modelini alıyoruz.

// Get Serivces
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Tüm postları çekiyoruz.
    res.status(200).json(posts); // Postları döndürüyoruz.
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPostDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id); // ID'si eşleşen postu çekiyoruz.
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post); // Postu döndürüyoruz.
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Add Services
const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz !" });
    }
    const newPost = await Post.create({ title, content });
    res.status(201).json({ status: "success", newPost });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update Services
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz !" });
    }
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ status: "success", post });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete Services
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ status: "success", post });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



module.exports = { getPosts, getPostDetail, addPost, updatePost, deletePost };
