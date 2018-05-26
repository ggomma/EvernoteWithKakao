import { noteStore } from './client';
import getNote from './getNote';
import { appendNote } from './utils'


const updateNote = (note) => {
  return new Promise((resolve, reject) => {
    noteStore.updateNote(note)
      .then(note => resolve(note))
      .catch(err => reject(err))
  })
}

export default updateNote;
