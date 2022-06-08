import { JOKEURL, WEATHERURL } from './variables.js';
export default class UI {
    constructor() {
        // Element variables
        this.jokeElement = document.querySelector('#joke');
        this.temperatureElement = document.querySelector('#temperature');
        this.weatherImageElement = document.querySelector('#weather-image');
        // Init Events
        this.initEvents();
        // Initial load
        this.loadWeatherInfo();
    }
    initEvents() {
        this.eventNextJokeButtonClick();
        this.eventFeedbackClick();
    }
    setTemperature(temp) {
        this.temperatureElement.innerHTML = Math.round(temp).toString() + ' ºC /';
    }
    setWeatherImg(src) {
        const imgElement = document.createElement('img');
        imgElement.src = src;
        this.weatherImageElement.appendChild(imgElement);
    }
    setJoke(value) {
        this.jokeElement.innerHTML = value;
    }
    showFeedback() {
        const feedbackElement = document.querySelector('#feedback');
        feedbackElement.style.display = 'flex';
    }
    loadWeatherInfo() {
        fetch(WEATHERURL, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
            // Show temperature
            this.setTemperature(data.main.temp);
            // Add img
            this.setWeatherImg(data.weather[0].icon);
        });
    }
    eventNextJokeButtonClick() {
        const getJokeBtn = document.querySelector('#get-joke');
        getJokeBtn.addEventListener('click', () => {
            fetch(JOKEURL, {
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                this.setJoke(data.joke);
                this.showFeedback();
            });
        });
    }
    eventFeedbackClick() {
        const reportAcudits = [];
        const feedbackJokeElements = document.getElementsByClassName('feedback-joke');
        Array.from(feedbackJokeElements).map(feedbackJokeElement => {
            feedbackJokeElement === null || feedbackJokeElement === void 0 ? void 0 : feedbackJokeElement.addEventListener('click', event => {
                const clickedElement = event.target;
                const score = clickedElement.getAttribute('data-value');
                // Add feedback to report array
                reportAcudits.push({
                    joke: this.jokeElement.innerHTML,
                    score: score ? +score : 0,
                    data: new Date().toISOString(),
                });
                // Diplay report
                console.log(reportAcudits);
            });
        });
    }
}
//# sourceMappingURL=ui.js.map