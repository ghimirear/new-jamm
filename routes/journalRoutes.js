const express = require('express')
const { getJournal, createJournal, updateJournal, deleteJournal, uploadImage } = require( "../controllers/journalcontroller")
const router = express.Router();
router.get("/journal/:id", getJournal);
router.delete("/journal/:id", deleteJournal);
router.post("/journal", createJournal);
router.put("/journal/:id", updateJournal)
//  router.put("/journal/upload:id", uploadImage);
module.exports= router;