import { prompt } from 'inquirer';
import { getBoards, getLists } from '../lib/trello-wrapper';

const getBoardChoices = () => getBoards().then(boards => boards.map(board => ({
  name: board.name,
  value: board.id,
})));

const getListChoices = ({ boardId }) => getLists(boardId).then(lists => lists.map(list => ({
  name: list.name,
  value: list.id,
})));

export default function () {
  return prompt([
    {
      type: 'list',
      name: 'boardId',
      message: 'Select output board: ',
      choices: getBoardChoices,
    },
    {
      type: 'list',
      name: 'listId',
      message: 'Select output list: ',
      choices: getListChoices,
    },
  ]);
}
