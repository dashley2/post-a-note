const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./Develop/db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// POST route
app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();
    if (!validateNote(req.body)) {
      res.status(400).send("The note is not properly formatted.");
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
  });

// Function to create new note and add to db.json
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
};

// Function to validate incoming data
function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
      return false;
    }
    if (!note.text || typeof note.text !== "string") {
      return false;
    }
    return true;
};

// html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
});
// wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

// listening route
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });