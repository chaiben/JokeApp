import {CHUCKNORISURL, ICANHAZDADJOKE, WEATHERURL} from './variables.js';

export default class UI {
  jokeElement: HTMLElement;
  temperatureElement: HTMLElement;
  weatherImageElement: HTMLElement;
  jokeCounter: number;
  getJokeBtn: HTMLElement;

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

    // Init Events
    this.initEvents();

    // Initial load
    this.loadWeatherInfo();
  }

  initEvents() {
    this.eventNextJokeButtonClick();
    this.eventFeedbackClick();
  }

  setTemperature(temp: number) {
    this.temperatureElement.innerHTML = Math.round(temp).toString() + ' ºC /';
  }

  setWeatherImg(src: string) {
    const imgElement = document.createElement('img');
    imgElement.src = src;
    this.weatherImageElement.appendChild(imgElement);
  }

  setJoke(value: string) {
    this.jokeElement.innerHTML = value;
  }

  showFeedback() {
    const feedbackElement = document.querySelector('#feedback') as HTMLElement;
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

  getIcanhazdadJoke() {
    fetch(ICANHAZDADJOKE, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setJoke(data.joke);
        this.showFeedback();
      });
  }

  getChuckNorisJoke() {
    fetch(CHUCKNORISURL, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setJoke(data.value);
        this.showFeedback();
      });
  }

  eventNextJokeButtonClick() {
    this.getJokeBtn.addEventListener('click', () => {
      this.jokeCounter % 2
        ? this.getChuckNorisJoke()
        : this.getIcanhazdadJoke();
      this.jokeCounter++;
    });
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
