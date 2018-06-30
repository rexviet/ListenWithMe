import _ from 'lodash';

export function toObjectByKey(arr, key) {
  return _.reduce(arr, function(result, val) {
    result[val[key]] = val;
    return result;
  }, {});
}

export function getRandomItem(arr) {
  return _.sample(arr);
}
