var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WEATHERURL } from './variables.js';
export default class FccWeather {
    constructor() {
        this.temperature = 0;
        this.weatherImg = '';
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(WEATHERURL, {
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                this.temperature = data.main.temp;
                this.weatherImg = data.weather[0].icon;
            });
        });
    }
    getTemperature() {
        return this.temperature;
    }
    getWeatherImg() {
        return this.weatherImg;
    }
}
//# sourceMappingURL=fccweather.js.map