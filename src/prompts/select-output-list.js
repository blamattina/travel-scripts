import { prompt } from 'inquirer';
import { getBoards, getLists } from '../lib/trello-wrapper';

const getBoardChoices = () => {
  return getBoards().then((boards) => {
    return boards.map((board) => {
      return {
        name: board.name,
        value: board.id
      };
    });
  });
};

const getListChoices = ({boardId}) => {
  return getLists(boardId).then((lists) => {
    return lists.map((list) => {
      return {
        name: list.name,
        value: list.id
      };
    });
  });
};

export default function () {
  return prompt([
      {
        type: 'list',
        name: 'boardId',
        message: 'Select output board: ',
        choices: getBoardChoices
      },
      {
        type: 'list',
        name: 'listId',
        message: 'Select output list: ',
        choices: getListChoices
      }
  ]);
}
