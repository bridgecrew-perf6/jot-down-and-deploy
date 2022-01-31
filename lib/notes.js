const fs = require("fs");
const path = require("path");

// in lib, we create a new note but this is connected to the post method in api routes
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title.length > 0 && !note.text.length > 0) {
        return false;
    }
        return true;
}

module.exports = {
    createNewNote, 
    validateNote  
};