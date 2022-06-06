const JOKEURL = 'https://icanhazdadjoke.com/';
const getJoke = document.querySelector('#get-joke');
const jokeElement = document.querySelector('#joke');

getJoke?.addEventListener('click', () => {
  fetch(JOKEURL, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      if (jokeElement) {
        jokeElement.innerHTML = data.joke;
      }
    });
});
