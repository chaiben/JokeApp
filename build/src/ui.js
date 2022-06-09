var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Icanhazdadjoke from './icanhazdadjoke.js';
import ChuckNorrisJoke from './chucknorrisJoke.js';
import FccWeather from './fccweather.js';
export default class UI {
    constructor() {
        this.jokeCounter = 0;
        // Element variables
        this.jokeElement = document.querySelector('#joke');
        this.temperatureElement = document.querySelector('#temperature');
        this.weatherImageElement = document.querySelector('#weather-image');
        this.getJokeBtn = document.querySelector('#get-joke');
        this.backgroundElement = document.querySelector('#background');
        // Init Events
        this.initEvents();
        // Initial load
        this.loadJoke();
        this.loadWeatherInfo();
    }
    initEvents() {
        this.eventNextJokeButtonClick();
        this.eventFeedbackClick();
    }
    setTemperature(temp) {
        this.temperatureElement.innerHTML = Math.round(temp).toString() + ' ºC';
    }
    setWeatherImg(src) {
        const imgElement = document.createElement('img');
        imgElement.src = src;
        this.weatherImageElement.appendChild(imgElement);
    }
    setJoke(value) {
        this.jokeElement.innerHTML = `"${value}"`;
    }
    showFeedback() {
        const feedbackElement = document.querySelector('#feedback');
        feedbackElement.style.display = 'flex';
    }
    loadWeatherInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const weather = new FccWeather();
            yield weather.init();
            this.setTemperature(weather.getTemperature());
            this.setWeatherImg(weather.getWeatherImg());
        });
    }
    getIcanhazdadJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            const joke = new Icanhazdadjoke();
            const result = yield joke.getJoke();
            return result;
        });
    }
    getChuckNorrisJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            const joke = new ChuckNorrisJoke();
            const result = yield joke.getJoke();
            return result;
        });
    }
    loadJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            const joke = this.jokeCounter % 2
                ? yield this.getChuckNorrisJoke()
                : yield this.getIcanhazdadJoke();
            this.setJoke(joke);
            this.jokeCounter++;
        });
    }
    eventNextJokeButtonClick() {
        this.getJokeBtn.addEventListener('click', () => {
            this.loadJoke();
            this.changeBackground(this.jokeCounter % 3);
        });
    }
    changeBackground(n) {
        let aux = 1;
        let opacity = 1;
        const intervalID = setInterval(() => {
            if (aux === 1) {
                if (opacity > 0) {
                    opacity = opacity - 0.1;
                    this.backgroundElement.style.opacity = opacity.toString();
                }
                else {
                    this.backgroundElement.className = 'background-' + n;
                    aux = 0;
                }
            }
            else {
                if (opacity < 1) {
                    opacity = opacity + 0.1;
                    this.backgroundElement.style.opacity = opacity.toString();
                }
                else {
                    clearInterval(intervalID);
                }
            }
        }, 20);
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