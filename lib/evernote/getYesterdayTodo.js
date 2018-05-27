import { dateToString } from '../../utils/dateToString';
import getNote from './getNote'
import { extractTodoPart, extractUndoneTodo } from './utils'

// date format : yyyy.mm.dd
const getYesterdayTodo = (today) => {
  return new Promise((resolve, reject) => {
    const date = new Date(`${today} 09:00:00`)
    date.setDate(date.getDate() - 1);
    getNote(dateToString(date))
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
