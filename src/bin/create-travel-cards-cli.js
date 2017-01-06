#!/usr/bin/env node
import { emoji } from 'node-emoji';
import ora from 'ora';
import selectOutputList from '../prompts/select-output-list';
import selectPlace from '../prompts/select-place';
import formatDescription from '../formatters/format-description';
import { createCard, uploadAttachment } from '../lib/trello-wrapper';
import { getPlace, getPlacePhoto } from '../lib/google-maps-wrapper';

function createPlaceCard(listId) {
  selectPlace().then(({ placeId }) => {
    getPlace(placeId).then((place) => {
      createCard({
        name: place.name,
        desc: formatDescription(place),
        listId,
      }).then(({ id }) => {
        if (!place.photos.length) {
          createPlaceCard(listId);
          return;
        }

        const spinner = ora({
          text: 'Uploading Photos',
          spinner: 'clock'
        }).start();

        const photoPromises = place.photos.map(photo =>
          getPlacePhoto(photo.photoReference).then(attachment =>
            uploadAttachment({
              cardId: id,
              attachment,
            })));

        Promise
          .all(photoPromises)
          .then(() => {
            spinner.stopAndPersist(`${emoji.rocket} `);
            createPlaceCard(listId);
          });
      });
    });
  });
}

selectOutputList().then(({ listId }) => {
  createPlaceCard(listId);
});
