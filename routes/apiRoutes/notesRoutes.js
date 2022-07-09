const router = require('express').Router();
const {createNewNote, findById, deleteNote, validateNote} = require('../../lib/notes');
const notes = require('../../Develop/db/db.json')

// GET route
router.get('/notes', (req, res) => {
    res.json(notes);
});

// GET route for id parameter
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
      // if ID does not correspond with the data, return 'Not Found' error
      } else {
        res.sendStatus(404);
      }
  });

// POST route
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    if (!validateNote(req.body)) {
      res.status(400).send("The note is not properly formatted.");
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});

// Route to delete note by ID
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes)
    res.json(true);
});

module.exports = router;