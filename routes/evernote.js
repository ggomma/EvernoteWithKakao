import express from 'express';
import createDailyNote from '../lib/evernote/createDailyNote';
import { scheduleJob } from 'node-schedule';

const router = express.Router();

router.get('/daily', (req, res, next) => {
  const today = new Date();
  const title = today.toISOString().slice(0,10).replace(/-/g, '.');
  createDailyNote({
    title,
  })
  res.send('DONE')
})

module.exports = router;


// scheduleJob('0 0 09 * * *', () => {
//   // every midnight in Korea timezone
//   const today = new Date();
//   const title = today.toISOString().slice(0,10).replace(/-/g, '.');
//   // createDailyNote({})
// });
