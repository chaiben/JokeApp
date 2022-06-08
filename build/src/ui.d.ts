export default class UI {
    jokeElement: HTMLElement;
    temperatureElement: HTMLElement;
    weatherImageElement: HTMLElement;
    jokeCounter: number;
    getJokeBtn: HTMLElement;
    backgroundElement: HTMLElement;
    constructor();
    initEvents(): void;
    setTemperature(temp: number): void;
    setWeatherImg(src: string): void;
    setJoke(value: string): void;
    showFeedback(): void;
    loadWeatherInfo(): void;
    getIcanhazdadJoke(): void;
    getChuckNorisJoke(): void;
    loadJoke(): void;
    eventNextJokeButtonClick(): void;
    changeBackground(n: number): void;
    eventFeedbackClick(): void;
}
