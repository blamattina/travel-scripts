import { prompt } from 'inquirer';
import { searchPlaces } from '../lib/google-maps-wrapper';

const getPlaceChoices = ({ searchQuery }) => searchPlaces(searchQuery)
  .then(places => places.map(place => ({
    name: `${place.name} - ${place.formattedAddress}`,
    value: place.placeId,
  })));

export default function () {
  return prompt([
    {
      type: 'input',
      name: 'searchQuery',
      message: 'Enter place name: ',
    },
    {
      type: 'list',
      name: 'placeId',
      message: 'Select place from list: ',
      choices: getPlaceChoices,
    },
  ]);
}
