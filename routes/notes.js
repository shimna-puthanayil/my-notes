const note = require('express').Router();
const { readFromFile, writeToFile } = require('../helpers/fsUtils');
//imported for unique id used when notes are written to db.json 
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
note.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// POST Route for submitting notes
note.post('/', (req, res) => {

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log(req.body);
  // If all the required properties are present
  if (title && text) {

    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readFromFile('./db/db.json')
      .then((data) => {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);
        // Add a new note
        parsedNotes.push(newNote);
        // Save that array to the files system
        writeToFile('./db/db.json', parsedNotes);
        const response = {
          status: 'success',
          body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
      });
  } else {
    res.status(500).json('Error in posting note');
  }
});


// DELETE Route for a specific note
note.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one which is selected to delete
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the file system
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted 🗑️`);
    });
});


module.exports = note;
