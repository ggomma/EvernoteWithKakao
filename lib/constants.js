const kakao = {
  SAVE_TO_EVERNOTE: 'Save to evernote',
};

let today = '';

const setToday = () => {
  let date = new Date();
  date = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  today = date.toISOString().slice(0,10).replace(/-/g, '.');
}

export {
  kakao,
  today,
  setToday,
};
