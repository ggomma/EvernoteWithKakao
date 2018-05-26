import { noteStore } from './client';
import Evernote from 'evernote';
import fs from 'fs';
import path from 'path';
import Note from '../../models/Notes';
import { dateToString } from '../../utils/dateToString';

const getNoteBookGuid = (title) => {
  return new Promise((resolve, reject) => {
    noteStore.listNotebooks()
      .then(notebooks => {
        notebooks.forEach(notebook => {
          if (notebook.name === title) return resolve(notebook.guid);
        })
      })
      .catch(err => reject(err))
  })
}

// date format : yyyy.mm.dd
const getYesterdayTodo = (today) => {
  return new Promise((resolve, reject) => {
    const date = new Date(`${today} 09:00:00`)
    date.setDate(date.getDate() - 1);
    Note.findNote(dateToString(date))
      .then(guid => {
        if (guid === null) return null;
        else return noteStore.getNote(guid, true, true, true, true)
          .then(note => {
            return note
          })
          .catch(err => {
            throw new Error(err)
          })
      })
      .catch(err => {
        if (err !== undefined) throw new Error(err);
        return null;
      })
      .then(note => {
        if (note === null) return resolve(null)
        const todoPart = extractTodoPart(note.content);
        if (todoPart === null) return resolve(null);
        return resolve(extractUndoneTodo(todoPart));
      })
      .catch(err => console.log(err))
  })
}

// getYesterdayTodo('2018.05.23')

const removeBlankBetweenTags = (content) => content.replace(/> +/g, '>').replace(/ +<\//g, '</');

const extractTodoPart = (content) => {
  let startTodo = '<div><b>To Do</b></div>';
  if (content.indexOf(startTodo) === -1) startTodo = '<div><span style="font-weight: bold;">To Do</span></div>'
  const endTodo = '<hr />';
  content = removeBlankBetweenTags(content)
  if (content.indexOf(startTodo) === -1 || content.indexOf(endTodo) === -1) return null;
  content = content.substring(content.indexOf(startTodo));
  content = content.substring(0, content.indexOf(endTodo) + endTodo.length)
  return content;
}

const extractUndoneTodo = (todoPart) => todoPart.replace(/<li>(<div>)?<en-todo checked="true" +\/>.+?(<\/div>)?<\/li>/gm, '');

const createDailyNote = ({
    title,
    content,
  }) => {
  return new Promise((resolve, reject) => {
    const newNote = new Evernote.Types.Note();
    newNote.title = title;
    getYesterdayTodo(title)
      .then(todoPart => {
        newNote.content = makeNoteBody(todoPart);
        return newNote;
      })
      .catch(() => {
        newNote.content = makeNoteBody(null);
        return newNote;
      })
      .then((note) => getNoteBookGuid('01@Diary')
        .then(guid => guid)
        .catch(err => {
          throw new Error(err)
        })
      )
      .then(guid => {
        newNote.notebookGuid = guid
        return newNote
      })
      .catch(err => reject(err))
      .then(note => {
        noteStore.createNote(note)
      })
      .then(note => {
        Note.saveNote(title, note.guid)
      })
      .catch(err => reject(err))
  });
};


const makeNoteBody = (todoPart) => {
  const startTodo = '<div><b>To Do</b></div>';
  const endTodo = '</div><br/><hr/>';
  let body = ''
  if (todoPart === null) {
    body = fs.readFileSync(path.join(__dirname, './formats/dailyNote.enex')).toString().replace(/\n/g, '');
    return body;
  }
  else {
    body = fs.readFileSync(path.join(__dirname, './formats/dailyNote.enex')).toString().replace(/\n/g, '').replace(/<div> *(<b>|(<span.*)) *To Do.*<hr +\/>/g, todoPart);
    return body;
  }
}


export default createDailyNote;
