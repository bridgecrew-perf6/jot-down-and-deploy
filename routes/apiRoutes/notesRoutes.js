const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;
    // if (req.query) {
    //     results = req.query;
        
    // }
    res.json(results);
});

router.post('/notes', (req, res) => {
    // set id based on the file's procedure
    req.body.id = (notes.length + 1).toString();
  
    // if any data in req.body is incorrect, send 400 error back. app validates the data in its own way so this is just for reference.
    if (!validateNote(req.body)) {
      res.status(400).send('The note is empty.');
    } else { // this originates in lib, and req.body is formatted from js/index.js as a key pair in handle save(). notes is required as the db array.
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});

// see js/index.js for delete dependencies/ starter code references
router.delete('/notes/:id', (req, res) => {
  notes.splice((parseInt(req.params.id) - 1), 1)
  res.json(notes)
 })

module.exports  = router;