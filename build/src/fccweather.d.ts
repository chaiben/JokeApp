export default class FccWeather {
    temperature: number;
    weatherImg: string;
    constructor();
    init(): Promise<void>;
    getTemperature(): number;
    getWeatherImg(): string;
}
