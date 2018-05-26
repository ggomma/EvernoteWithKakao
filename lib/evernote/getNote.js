import { noteStore } from './client';
import Note from '../../models/Notes';

const getNote = (date) => {
  return new Promise((resolve, reject) => {
    Note.findNote(date)
      .then(guid => noteStore.getNote(guid, true, true, true, true))
      .catch(err => {
        throw new Error(err);
      })
      .then(savedNote => resolve(savedNote))
      .catch(err => reject(err))
  })
}

export default getNote;
