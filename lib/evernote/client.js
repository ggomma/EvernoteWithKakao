import Evernote from 'evernote';
import { evernote } from '../../credentials';
const { devToken } = evernote;

const client = new Evernote.Client({
  sandbox: false,
  token: devToken,
})

const noteStore = client.getNoteStore();

export {
  noteStore,
};
