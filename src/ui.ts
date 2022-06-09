import Icanhazdadjoke from './icanhazdadjoke.js';
import ChuckNorrisJoke from './chucknorrisjoke.js';
import FccWeather from './fccweather.js';

export default class UI {
  jokeElement: HTMLElement;
  temperatureElement: HTMLElement;
  weatherImageElement: HTMLElement;
  jokeCounter: number;
  getJokeBtn: HTMLElement;
  backgroundElement: HTMLElement;

  constructor() {
    this.jokeCounter = 0;
    // Element variables
    this.jokeElement = document.querySelector('#joke') as HTMLElement;
    this.temperatureElement = document.querySelector(
      '#temperature'
    ) as HTMLElement;
    this.weatherImageElement = document.querySelector(
      '#weather-image'
    ) as HTMLElement;
    this.getJokeBtn = document.querySelector('#get-joke') as HTMLElement;
    this.backgroundElement = document.querySelector(
      '#background'
    ) as HTMLElement;

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

  setTemperature(temp: number) {
    this.temperatureElement.innerHTML = Math.round(temp).toString() + ' ºC';
  }

  setWeatherImg(src: string) {
    const imgElement = document.createElement('img');
    imgElement.src = src;
    this.weatherImageElement.appendChild(imgElement);
  }

  setJoke(value: string) {
    this.jokeElement.innerHTML = `"${value}"`;
  }

  showFeedback() {
    const feedbackElement = document.querySelector('#feedback') as HTMLElement;
    feedbackElement.style.display = 'flex';
  }

  async loadWeatherInfo() {
    const weather = new FccWeather();
    await weather.init();
    this.setTemperature(weather.getTemperature());
    this.setWeatherImg(weather.getWeatherImg());
  }

  async getIcanhazdadJoke() {
    const joke = new Icanhazdadjoke();
    return await joke.getJoke();
  }

  async getChuckNorrisJoke() {
    const joke = new ChuckNorrisJoke();
    return await joke.getJoke();
  }
  async loadJoke() {
    const joke: string =
      this.jokeCounter % 2
        ? await this.getChuckNorrisJoke()
        : await this.getIcanhazdadJoke();
    this.setJoke(joke);
    this.jokeCounter++;
  }

  eventNextJokeButtonClick() {
    this.getJokeBtn.addEventListener('click', () => {
      this.loadJoke();
      this.changeBackground(this.jokeCounter % 3);
    });
  }

  changeBackground(n: number) {
    let aux = 1;
    let opacity = 1;
    const intervalID = setInterval(() => {
      if (aux === 1) {
        if (opacity > 0) {
          opacity = opacity - 0.1;
          this.backgroundElement.style.opacity = opacity.toString();
        } else {
          this.backgroundElement.className = 'background-' + n;
          aux = 0;
        }
      } else {
        if (opacity < 1) {
          opacity = opacity + 0.1;
          this.backgroundElement.style.opacity = opacity.toString();
        } else {
          clearInterval(intervalID);
        }
      }
    }, 20);
  }

  eventFeedbackClick(): void {
    const reportAcudits: {joke: string; score: number; data: string}[] = [];
    const feedbackJokeElements = document.getElementsByClassName(
      'feedback-joke'
    ) as HTMLCollectionOf<HTMLElement>;
    Array.from(feedbackJokeElements).map(feedbackJokeElement => {
      feedbackJokeElement?.addEventListener('click', event => {
        const clickedElement = event.target as HTMLElement;
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
