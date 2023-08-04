const note = require('express').Router();
const { readAndAppend,readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');



// GET Route for retrieving all the notes
note.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
note.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && title) {
    // Variable for the object we will save
    const newNote= {
      title,
      text,
      note_id:uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = note;
