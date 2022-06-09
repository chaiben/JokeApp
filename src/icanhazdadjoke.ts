import {ICANHAZDADJOKE} from './variables.js';

export default class Icanhazdadjoke {
  async getJoke() {
    let result = '';
    await fetch(ICANHAZDADJOKE, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        result = data.joke;
      });
    return result;
  }
}
