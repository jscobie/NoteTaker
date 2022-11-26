// Set Router to be a router for express.js
const router = require('express').Router();

// Require fs, File System, functionality to be able to access the db.json file and adjust it based on coding
const fs = require('fs');

// Hanlde Get of existing notes, to populate on page
router.get('/notes', function(req, res) {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      res.send(dbData);
    });
  });

// Handle the Post of new notes when user clicks save
router.post('/notes', function(req, res) {
    const userNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      dbData.push(userNotes);
      let number = 1;
      dbData.forEach((note, index) => {
        note.id = number;
        number++;
        return dbData;
      });
      console.log(dbData);

      stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send('Note Added');
  });


// Handle the Delete HTTP request of a note, based on ID, from user clicking the delete icon
router.delete('/notes/:id', function(req, res) {
    // Grab the ID of the note user wants to remove
    const deleteNote = req.params.id;
    console.log(`Delete note ID: ${deleteNote}`);

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;

      // Copmpare ID or deleted note to notes in the db.json file
      dbData = JSON.parse(data);
      // Go through notes, to match and then splice the one selected for deletion
      for (let i = 0; i < dbData.length; i++) {
        if (dbData[i].id === Number(deleteNote)) {
          dbData.splice([i], 1);
        }
      }
      console.log(dbData);
      stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    // Express response.status(204)
    res.status(204).send();
  });

module.exports = router;