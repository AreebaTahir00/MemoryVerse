const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {createMemory, getMemories, deleteMemory, updateMemory,} = require("../controllers/memoryController");

// CREATE MEMORY
router.post("/", protect, upload.single("image"), createMemory);

// GET MEMORIES
router.get("/", protect, getMemories);

// DELETE MEMORY
router.delete("/:id", protect, deleteMemory);

// UPDATE MEMORY
router.put("/:id", protect, upload.single("image"), updateMemory);

//router.get("/search", protect, searchMemory);

module.exports = router;
