import maps from '@google/maps';

const {
  GOOGLE_KEY
} = process.env;

const client = maps.createClient({
  key: GOOGLE_KEY
});

export function searchPlaces(query) {
  return new Promise((resolve, reject) => {
    client.places({ query }, (err, response) => {
      if (err) return reject(err);
      return resolve(response.json.results);
    })
  });
}

export function getPlace(placeid) {
  return new Promise((resolve, reject) => {
    client.place({ placeid }, (err, response) => {
      if (err) return reject(err);
      return resolve(response.json.result);
    })
  });
}

export function getPlacePhoto(photoreference, maxwidth = 800) {
  return new Promise((resolve, reject) => {
    client.placesPhoto({ photoreference, maxwidth }, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    })
  });
};
