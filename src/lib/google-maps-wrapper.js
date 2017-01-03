import maps from '@google/maps';
import { camelizeKeys } from 'humps';
import { KEYS, getConfig } from '../constants/config';

const CONFIG = getConfig();

const client = maps.createClient({
  key: CONFIG[KEYS.GOOGLE_API_KEY],
});

export function searchPlaces(query) {
  return new Promise((resolve, reject) => {
    client.places({ query }, (err, response) => {
      if (err) return reject(err);
      return resolve(camelizeKeys(response.json.results));
    });
  });
}

export function getPlace(placeid) {
  return new Promise((resolve, reject) => {
    client.place({ placeid }, (err, response) => {
      if (err) return reject(err);
      return resolve(camelizeKeys(response.json.result));
    });
  });
}

export function getPlacePhoto(photoreference, maxwidth = 800) {
  return new Promise((resolve, reject) => {
    client.placesPhoto({ photoreference, maxwidth }, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
}
