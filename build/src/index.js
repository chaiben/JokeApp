"use strict";
const JOKEURL = 'https://icanhazdadjoke.com/';
const getJoke = document.querySelector('#get-joke');
const jokeElement = document.querySelector('#joke');
const feedbackElement = document.querySelector('#feedback');
const feedbackJokeElements = document.getElementsByClassName('feedback-joke');
const reportAcudits = [];
// Get a new Joke
getJoke === null || getJoke === void 0 ? void 0 : getJoke.addEventListener('click', () => {
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
    feedbackJokeElement === null || feedbackJokeElement === void 0 ? void 0 : feedbackJokeElement.addEventListener('click', event => {
        const clickedElement = event.target;
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
//# sourceMappingURL=index.js.map