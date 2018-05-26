import { noteStore } from './client';
import Evernote from 'evernote';
import fs from 'fs';
import path from 'path';
import Note from '../../models/Notes';
import { dateToString } from '../../utils/dateToString';
import getNote from './getNote';
import appendNote from './appendNote'

const updateNote = (note) => {
  return new Promise((resolve, reject) => {
    noteStore.updateNote(note)
      .then(note => resolve(note))
      .catch(err => reject(err))
  })
}

export default updateNote;
