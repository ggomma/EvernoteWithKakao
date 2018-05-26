import { noteStore } from './client';
import getYesterdayTodo from './getYesterdayTodo';
import getNoteBookGuid from './getNoteBookGuid';
import { makeNoteBody } from './utils';
import Evernote from 'evernote';
import Note from '../../models/Notes';


const postDailyNote = (title) => {
  const newNote = new Evernote.Types.Note();
  newNote.title = title;
  getYesterdayTodo(title)
    .then(todoPart => {
      if (todoPart === null) newNote.content = makeNoteBody(null);
      newNote.content = makeNoteBody(todoPart);
      return newNote;
    })
    .then(note => getNoteBookGuid('01@Diary'))
    .then(guid => {
      newNote.notebookGuid = guid
      return newNote
    })
    .then(note => noteStore.createNote(note))
    .then(storedNote => Note.saveNote(title, storedNote.guid))
    .then(console.log)
    .catch(console.log)
};

export default postDailyNote;
