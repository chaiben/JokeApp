const JOKEURL = 'https://icanhazdadjoke.com/';
const getJoke = document.querySelector('#get-joke');

getJoke?.addEventListener('click', () => {
  fetch(JOKEURL)
    .then(response => response.json())
    .then(data => console.log(data));
});
