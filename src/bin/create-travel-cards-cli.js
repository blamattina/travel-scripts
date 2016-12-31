#!/usr/bin/env node
import selectOutputList from '../prompts/select-output-list';
import selectPlace from '../prompts/select-place';
import formatDescription from '../formatters/format-description';
import { createCard, uploadAttachment } from '../lib/trello-wrapper';
import { getPlace, getPlacePhoto } from '../lib/google-maps-wrapper';

function createPlaceCard(listId) {
  selectPlace().then(({placeId}) => {
    getPlace(placeId).then((place) => {

      const cardPromise = createCard({
        name: place.name,
        desc: formatDescription(place),
        listId
      }).then(({ id }) => {
        const limitedPhotos = place.photos.slice(0, 10);

        const photoPromises = limitedPhotos.map((photo) => {
          getPlacePhoto(photo.photo_reference).then((attachment) => {
            uploadAttachment({ cardId: id, attachment });
          });
        });

        Promise.all(photoPromises).then(() => createPlaceCard(listId));
      });
    });
  });
};

selectOutputList().then(({listId}) => {
  createPlaceCard(listId);
});
