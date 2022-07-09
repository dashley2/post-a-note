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
app.use(express.static('./Develop/public'));

// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// GET route for id parameter
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
      // if ID does not correspond with the data, return 'Not Found' error
      } else {
        res.sendStatus(404);
      }
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

// Route to delete note by ID
app.delete("/api/notes/:id", (req, res) => {
    deleteNote(req.params.id, notes)
    res.json(true);
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

// Function to take id and array of notes to return single object
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

// Function to delete note by id parameter
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './Develop/db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

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