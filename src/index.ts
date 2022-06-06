const JOKEURL = 'https://icanhazdadjoke.com/';
const getJoke = document.querySelector('#get-joke') as HTMLElement;
const jokeElement = document.querySelector('#joke') as HTMLElement;
const feedbackElement = document.querySelector('#feedback') as HTMLElement;
const feedbackJokeElements = document.getElementsByClassName(
  'feedback-joke'
) as HTMLCollectionOf<HTMLElement>;
const reportAcudits: {joke: string; score: number; data: string}[] = [];

// Get a new Joke
getJoke?.addEventListener('click', () => {
  fetch(JOKEURL, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      jokeElement.innerHTML = data.joke;
      // Show feedback buttons
      feedbackElement.style.display = 'flex';
    });
});

// Get Feedback events
Array.from(feedbackJokeElements).map(feedbackJokeElement => {
  feedbackJokeElement?.addEventListener('click', event => {
    const clickedElement = event.target as HTMLElement;
    const score = clickedElement.getAttribute('data-value');
    // Add feedback to report array
    reportAcudits.push({
      joke: jokeElement.innerHTML,
      score: score ? +score : 0,
      data: new Date().toISOString(),
    });
    // Diplay report
    console.log(reportAcudits);
  });
});
