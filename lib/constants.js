const kakao = {
  SAVE_TO_EVERNOTE: 'Save to evernote',
};

let today = '';

const setToday = () => {
  const date = new Date();
  today = date.toISOString().slice(0,10).replace(/-/g, '.');
}

export {
  kakao,
  today,
  setToday,
};
