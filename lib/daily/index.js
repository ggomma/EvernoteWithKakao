import { setToday } from '../constants';
import { scheduleJob } from 'node-schedule';
import { postDailyNote } from '../evernote';

// INIT
setToday();

// every midnight in Korea timezone
scheduleJob('0 0 09 * * *', () => {
  setToday();
  postDailyNote({ title: today })
});
