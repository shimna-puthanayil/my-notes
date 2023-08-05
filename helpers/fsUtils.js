const fs = require('fs');
const util = require('util');
const { readFile, writeFile } = require('fs/promises');
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Promise version of fs.writeFile

const fs_writeFile = util.promisify(fs.writeFile)

//  Function to write data to the JSON file given a destination and some content
//  @param {string} destination The file you want to write to.
// @param {object} content The content you want to write to the file.
// @returns {void} Nothing

// const writeToFile = (destination, content) =>

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );



// const writeToFile = (destination, content) =>{
//   return new Promise(function(resolve, reject) {
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? reject(err): resolve(content))
// });
// };

// Function to read data from a given a file and append some content
// @param {object} content The content you want to append to the file.
// @param {string} file The path to the file you want to save to.
// @returns {void} Nothing

const readAndAppend = (content, file) => {
  // fs.readFile(file, 'utf8', (err, data) => {
  readFromFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData)
  
      //  const response=await saveNote(newNote);
      //  const res = await response.json();

    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
