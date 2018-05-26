import { noteStore } from './client';

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

export default getNoteBookGuid;
