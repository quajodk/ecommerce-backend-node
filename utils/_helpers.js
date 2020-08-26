/**
 * Helper functions for the app
 */

const crypto = require('crypto');
require('dotenv').config();

const _helper = {};

// hashing password
_helper.hash = (str) => {
  if (typeof str === 'string' && str.length > 0) {
    const hash = crypto
      .createHmac('sha256', process.env.HASH_SECRET)
      .update(str)
      .digest('hex');
    return hash;
  } else {
    return false;
  }
};

// generating token
_helper.token = (strLen) => {
  strLen = typeof strLen === 'number' && strLen > 0 ? strLen : false;

  if (strLen) {
    // possible character to be included
    const possibleCharacters = 'ABCDEFGHIJklmnopqrstuvwxyz0123456789';

    let str = '';
    for (let i = 1; i <= strLen; i++) {
      // get random characters from the possible character
      const randomCharacter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );

      // append it to string
      str += randomCharacter;
    }

    return str;
  } else {
    return false;
  }
};

module.exports = _helper;
