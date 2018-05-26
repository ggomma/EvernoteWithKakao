import { noteStore } from './client';
import Note from '../../models/Notes';
import getNote from './getNote';
import fs from 'fs';
import path from 'path';

const appendNote = (note, content) => {
  note.content = note.content.replace(/\<\/en-note\>/, '') + makeNoteBody(content) + "</en-note>";
  return note;
}

const makeNoteBody = (content) => fs.readFileSync(path.join(__dirname, './formats/appendNote.enex')).toString().replace(/\n/g, '').replace(/#\[content\]/g, content);


export default appendNote;
