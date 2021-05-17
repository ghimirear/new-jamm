const express = require('express')
const { getJournal, createJournal, updateJournal, deleteJournal } = require( "../controllers/journalcontroller")
const router = express.Router();
router.get("/journal/:id", getJournal);
router.delete("/journal/:id", deleteJournal);
router.post("/journal", createJournal);
router.put("/user/journal/:id", updateJournal)
module.exports= router;