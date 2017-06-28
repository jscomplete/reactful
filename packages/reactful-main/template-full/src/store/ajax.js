import axios from 'axios';
import { Seq } from 'immutable';

function fromJSOrdered(js) {
  return typeof js !== 'object' || js === null
    ? js
    : Array.isArray(js)
      ? Seq(js).map(fromJSOrdered).toList()
      : Seq(js).map(fromJSOrdered).toOrderedMap();
}

export default {
  fetchTest: () => {
    return axios
      .get('/')
      .then(() => fromJSOrdered({ message: 'Async action test' }));
  },
};
