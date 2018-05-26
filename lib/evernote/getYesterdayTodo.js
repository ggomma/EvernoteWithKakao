import Note from '../../models/Notes';
import { dateToString } from '../../utils/dateToString';

// date format : yyyy.mm.dd
const getYesterdayTodo = (today) => {
  return new Promise((resolve, reject) => {
    const date = new Date(`${today} 09:00:00`)
    date.setDate(date.getDate() - 1);
    Note.findNote(dateToString(date))
      .then(guid => {
        if (guid === null) return null;
        else return noteStore.getNote(guid, true, true, true, true)
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

export default getYesterdayTodo;
