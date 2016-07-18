import { camelCase } from './utils/StringUtils';

function deepCamelCaseKeys(obj) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      deepCamelCaseKeys(obj[i]);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];

      if (camelCase(key) !== key) {
        obj[camelCase(key)] = obj[key];
        delete obj[key];
      }
    }
  }
}

class BootstrapData {
  constructor() {
    this.cache = {};
  }

  get(key) {
    if (key in this.cache) {
      return this.cache[key];
    }

    const meta = document.getElementById('_bootstrap_' + key);
    if (meta === null) {
      return false;
    }

    const value = meta.getAttribute('content');
    this.cache[key] = value;

    return value;
  }

  getJSON(key) {
    var jsonValue = JSON.parse(this.get(key));
    deepCamelCaseKeys(jsonValue);
    return jsonValue;
  }
}

export default new BootstrapData();
