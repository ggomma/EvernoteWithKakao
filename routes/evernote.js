import express from 'express';
import { postDailyNote, getNote } from '../lib/evernote';
import { today } from '../lib/constants';

const router = express.Router();

// Forcefully generate today's note
router.get('/daily', (req, res, next) => {
  postDailyNote(today)
  res.send('DONE');
})

module.exports = router;
