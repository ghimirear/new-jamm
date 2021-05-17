const express = require('express')
const { getQuotes, createQuote,  deleteQuote } = require( "../controllers/quotecontroller")
const router = express.Router();
router.get("/get/:id", getQuotes);
router.delete("/delete/:id", deleteQuote);
router.post("/create", createQuote);
module.exports= router;