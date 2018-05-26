import fs from 'fs';
import path from 'path';

const makeNoteBody = (todoPart) => {
  const startTodo = '<div><b>To Do</b></div>';
  const endTodo = '</div><br/><hr/>';
  const body = fs.readFileSync(path.join(__dirname, '../formats/dailyNote.enex')).toString().replace(/\n/g, '');
  if (todoPart === null) {
    return body
  } else {
    return body.replace(/<div> *(<b>|(<span.*)) *To Do.*<hr +\/>/g, todoPart);
  }
}

export default makeNoteBody;
