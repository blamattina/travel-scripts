import os from 'os';
import { once, has, keys } from 'lodash';
import dotenv from 'dotenv';
import invariant from 'invariant';
import keyMirror from 'keymirror';

const HOME = os.homedir();

export const CONFIG_FILE = `${HOME}/.travelrc`;

export const KEYS = keyMirror({
  TRELLO_API_KEY: null,
  TRELLO_TOKEN: null,
  GOOGLE_API_KEY: null,
});

export const getConfig = once(() => {
  const CONFIG = dotenv.config({ path: CONFIG_FILE });

  const missingKeys = keys(KEYS).reduce((missingKeys, key) => {
    if (!has(CONFIG, key)) {
      missingKeys.push(key);
    }
    return missingKeys;
  }, []);

  invariant(
    !missingKeys.length,
    `Missing configuration for ${JSON.stringify(missingKeys)} in ${CONFIG_FILE}`,
  );

  return CONFIG;
});
