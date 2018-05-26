import { kakao, today } from '../constants';
import kakaoSession from '../session';
import { updateNote, getNote } from '../evernote';
import { appendNote } from '../evernote/utils';

const selector = (userId, content) => {
  return new Promise((resolve, reject) => {
    switch (content){
      // Enter kakao-evernote mode
      case kakao.SAVE_TO_EVERNOTE:
        kakaoSession[userId] = kakao.SAVE_TO_EVERNOTE;
        return resolve({
          "message": {
            "text": "Type what you want to save.",
          },
          "keyboard": {
            "type": "text",
          }
        })
        break;
      // add kakao message to evernote
      default:
        getNote(today)
          .then(note => appendNote(note, content))
          .then(note => updateNote(note))
          .catch(err => {
            throw new Error(err);
          })
          .then(note => {
            return resolve({
              "message": {
                "text" : "Successfully saved."
              }
            })
          })
        break;
    }
  })
}

export default selector;
