import { kakao } from '../constants';
import kakaoSession from '../session';
import updateNote from '../evernote/updateNote';
import appendNote from '../evernote/appendNote';
import getNote from '../evernote/getNote';


const selector = (userId, content) => {
  switch (content){
    case kakao.SAVE_TO_EVERNOTE:
      kakaoSession[userId] = kakao.SAVE_TO_EVERNOTE
      return {
        "message": {
          "text": "Type what you want to save.",
        },
        "keyboard": {
          "type": "text",
        }
      }
      break;
    default:
      // getNote(today)
      getNote('2018.05.26')
        .then(note => appendNote(note, content))
        .then(note => updateNote(note))
        .catch(err => {
          throw new Error(err);
        })
        .then(note => {
          return {
            "message": {
              "text" : "Successfully saved."
            }
          }
        })
      break;
  }
}

export default selector;
