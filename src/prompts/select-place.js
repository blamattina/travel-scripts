import { prompt } from 'inquirer';
import { searchPlaces } from '../lib/google-maps-wrapper';

const getPlaceChoices = ({searchQuery}) => {
  return searchPlaces(searchQuery).then((places) => {
    return places.map((place) => {
      return {
        name: `${place.name} - ${place.formatted_address}`,
        value: place.place_id
      };
    });
  });
};

export default function() {
  return prompt([
    {
      type: 'input',
      name: 'searchQuery',
      message: 'Enter place name: '
    },
    {
      type: 'list',
      name: 'placeId',
      message: 'Select place from list: ',
      choices: getPlaceChoices
    }
  ]);
}
