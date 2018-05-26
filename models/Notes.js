import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
  },
  guid: {
    type: String,
  },
});


noteSchema.statics.saveNote = (title, guid) => {
  return new Promise((resolve, reject) => {
    Note.findOne({title}, (err, exNote) => {
      if(err) return reject(err);
      let note = new Note();
      if (exNote) {
        note = exNote;
      }
      note.title = title;
      note.guid = guid;
      note.save(err => {
        if(err) return reject(err);
        else return resolve(true);
      });
    })
  })
}

noteSchema.statics.findNote = (title) => {
  return new Promise((resolve, reject) => {
    Note.findOne({title}, (err, note) => {
      if(err) return reject(err);
      if(note === null || note === undefined) return resolve(null);
      else return resolve(note.guid);
    });
  })
}


const Note = mongoose.model('Note', noteSchema);
export default Note;
