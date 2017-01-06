import fs from 'fs';
import path from 'path';
import Mustache from 'mustache';

const templatePath = path
  .join(__dirname, '../templates/card-description.mustache');

const template = fs
  .readFileSync(templatePath)
  .toString();

export default function (place) {
  return Mustache.render(template, place);
}
