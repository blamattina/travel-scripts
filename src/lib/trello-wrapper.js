import Trello from 'node-trello';
import { KEYS, getConfig } from '../constants/config';

const CONFIG = getConfig();

const client = new Trello(
  CONFIG[KEYS.TRELLO_API_KEY],
  CONFIG[KEYS.TRELLO_TOKEN],
);

export function getBoards() {
  return new Promise((resolve, reject) => {
    client.get('/1/member/me/boards', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

export function getLists(boardId) {
  return new Promise((resolve, reject) => {
    client.get(`/1/boards/${boardId}/lists`, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

export function createCard({ name, desc, listId }) {
  const card = {
    name,
    desc,
    idList: listId,
    pos: 'top',
    due: null,
  };

  return new Promise((resolve, reject) => {
    client.post('/1/cards/', card, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

export function uploadAttachment({ cardId, attachment }) {
  return new Promise((resolve, reject) => {
    client.post(`/1/cards/${cardId}/attachments`, { attachment }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
