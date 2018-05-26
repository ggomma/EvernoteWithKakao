import express from 'express';
import selector from '../lib/kakao';
import { kakao as KAKAO } from '../lib/constants';

const router = express.Router();


router.get('/keyboard', (req, res, next) => {
  res.json({
    "type" : "buttons",
    "buttons" : [KAKAO.SAVE_TO_EVERNOTE]
  });
})


router.post('/message', (req, res, next) => {
  const { user_key, content } = req.body;
  selector(user_key, content)
    .then(message => res.json(message))
    .catch(err => {
      throw new Error(err);
    })
})

module.exports = router;
