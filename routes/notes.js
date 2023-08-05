const note = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
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
      id: uuidv4()
    };

    //##############################################

  //   readAndAppend(newNote, './db/db.json')
  //     .then((data) => JSON.parse(data))
  //     .then((res) => {
  //       const response = {
  //         status: 'success',
  //         body: newNote
  //       };
  //       res.json(response);
  //     });
  // } else {
  //   res.json('Error in posting notes');
  // }

  //##############################################

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new note
      parsedNotes.push(newNote);

      // Write updated notes back to the file
      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully added notes!')
      );

      const response = {
        status: 'success',
        body: newNote,
      };

      console.log(response);
      res.status(201).json(response);

    }
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

      // Save that array to the filesysqqtem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted 🗑️`);
    });
});
module.exports = note;
