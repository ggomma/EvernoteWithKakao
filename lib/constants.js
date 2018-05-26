export const kakao = {
  SAVE_TO_EVERNOTE: 'Save to evernote',
};

export let today = '';

export const setToday = () => {
  const date = new Date();
  today = date.toISOString().slice(0,10).replace(/-/g, '.');
};
