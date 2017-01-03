#!/usr/bin/env node
import { emoji } from 'node-emoji';
import chalk from 'chalk';
import selectOutputList from '../prompts/select-output-list';
import selectPlace from '../prompts/select-place';
import formatDescription from '../formatters/format-description';
import logger from '../lib/logger';
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
        logger(`${emoji.rocket}  ${chalk.yellow('Uploading Photos...')}`);
        const photoPromises = place.photos.map(photo =>
          getPlacePhoto(photo.photoReference).then(attachment =>
            uploadAttachment({
              cardId: id,
              attachment,
            })));

        Promise
          .all(photoPromises)
          .then(() => {
            logger(`${emoji.zap}  ${chalk.blue('Done!')}`);
            createPlaceCard(listId);
          });
      });
    });
  });
}

selectOutputList().then(({ listId }) => {
  createPlaceCard(listId);
});
