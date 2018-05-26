import express from 'express';
import selector from '../lib/kakao';
import { kakao as KAKAO } from '../lib/constants';

const router = express.Router();


router.get('/keyboard', (req, res, next) => {
  res.json({
    "type" : "buttons",
    "buttons" : [KAKAO.SAVE_TO_EVERNOTE, "선택 2", "선택 3"]
  });
})


router.post('/message', (req, res, next) => {
  const { user_key, content } = req.body;
  const nextStep = selector(user_key, content);

  res.json(nextStep);
})

module.exports = router;
