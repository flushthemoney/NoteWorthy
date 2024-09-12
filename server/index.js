require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

// mid
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// add note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Notes.create({ title, description });

    if (!data) {
      throw new Error("An error occured while creating the note");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating the note" });
  }
});

// get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});

    if (!data) {
      throw new Error("An error occured while fetching the notes");
    }

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the notes" });
  }
});

// get note by id
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);

    if (!data) {
      throw new Error("An error occured while fetching the note");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching the note" });
  }
});

// update note by id
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const data = await Notes.findByIdAndUpdate(noteId, { title, description });

    if (!data) {
      throw new Error("An error occured while updating the note");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while updating the note" });
  }
});

// delete note by id
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findByIdAndDelete(noteId);

    if (!data) {
      throw new Error("An error occured while deleting the note");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting the note" });
  }
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
