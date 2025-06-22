import Hashids from 'hashids';

const SALT = 'secret-salt';
const MIN_LENGTH = 6;
const hashids = new Hashids(SALT, MIN_LENGTH);

export function encodeId(id) {
  return hashids.encode(id);
}

export function decodeId(hash) {
  const [decoded] = hashids.decode(hash);
  return decoded;
}

export default {encodeId, decodeId};