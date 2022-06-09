import {WEATHERURL} from './variables.js';

export default class FccWeather {
  temperature: number;
  weatherImg: string;
  constructor() {
    this.temperature = 0;
    this.weatherImg = '';
  }

  async init() {
    await fetch(WEATHERURL, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.temperature = data.main.temp;
        this.weatherImg = data.weather[0].icon;
      });
  }

  getTemperature() {
    return this.temperature;
  }
  getWeatherImg() {
    return this.weatherImg;
  }
}
