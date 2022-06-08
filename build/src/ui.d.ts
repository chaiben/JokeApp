export default class UI {
    jokeElement: HTMLElement;
    temperatureElement: HTMLElement;
    weatherImageElement: HTMLElement;
    constructor();
    initEvents(): void;
    setTemperature(temp: number): void;
    setWeatherImg(src: string): void;
    setJoke(value: string): void;
    showFeedback(): void;
    loadWeatherInfo(): void;
    eventNextJokeButtonClick(): void;
    eventFeedbackClick(): void;
}
