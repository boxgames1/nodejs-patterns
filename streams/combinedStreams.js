const zlib = require("zlib");
const crypto = require("crypto");
const combine = require("combine");

// This will act as black-boxes
module.exports.compressAndEncrypt = password =>
  combine(zlib.createGzip(), crypto.createCipher("aes192", password));

module.exports.decryptAndDecompress = password =>
  combine(crypto.createDecipher("aes192", password), zlib.createGunzip());
