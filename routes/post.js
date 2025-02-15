const express = require('express');
const router = express.Router();
const { getPosts, getPostDetail, addPost, updatePost, deletePost } = require("../controller/post.js");


// Çekme İşlemleri
router.get("/getPosts",getPosts);
router.get("/getPostDetail/:id",getPostDetail);

// Ekleme İşlemleri
router.post("/addPost",addPost);

// Güncelleme İşlemleri
router.put("/updatePost/:id",updatePost);

// Silme İşlemleri
router.delete("/deletePost/:id",deletePost);

module.exports = router;

