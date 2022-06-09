import {CHUCKNORRISURL} from './variables.js';

export default class ChuckNorrisJoke {
  async getJoke() {
    let result = '';
    await fetch(CHUCKNORRISURL, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        result = data.value;
      });
    return result;
  }
}
