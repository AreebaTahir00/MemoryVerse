const Memory = require("../models/Memory");

// Create memory
const createMemory = async (req, res) => {
  try {
    const { title, description, location, date, privacy } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "Title, description, and date are required" });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const memory = await Memory.create({
      user: req.user._id,
      title,
      description,
      location,
      date,
      privacy,
      image: imagePath,
    });

    res.status(201).json(memory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get memories (own + public)
const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find({
      $or: [{ user: req.user._id }, { privacy: "public" }],
    }).sort({ date: -1 });

    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete memory
const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    if (memory.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this memory" });
    }

    await memory.deleteOne();
    res.status(200).json({ message: "Memory deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update memory
const updateMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    if (memory.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this memory" });
    }

    if (req.file) {
      memory.image = `/uploads/${req.file.filename}`;
    }

    memory.title = req.body.title || memory.title;
    memory.description = req.body.description || memory.description;
    memory.location = req.body.location || memory.location;
    memory.date = req.body.date || memory.date;
    memory.privacy = req.body.privacy || memory.privacy;

    await memory.save();
    res.status(200).json(memory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Search by title
const searchMemory = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const memories = await Memory.find({
      user: req.user._id,
      title: {
        $regex: title,
        $options: "i"
      }
    });

    res.status(200).json(memories);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { createMemory, getMemories, deleteMemory, updateMemory };
