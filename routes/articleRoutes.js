const express = require('express')
const { getArticle, createArticle, updateArticle, deleteArticle, uploadImage } = require( "../controllers/articlecontroller")
const router = express.Router();
router.get("/get/:id", getArticle);
//router.get("/article/:id", getArticleById);
router.delete("/delete/:id", deleteArticle);
router.post("/create", createArticle);
router.put("/update/:id", updateArticle)
router.put("/upload/:id", uploadImage);
module.exports= router;