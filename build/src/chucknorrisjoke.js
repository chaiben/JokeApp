var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CHUCKNORRISURL } from './variables.js';
export default class ChuckNorrisJoke {
    getJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = '';
            yield fetch(CHUCKNORRISURL, {
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                result = data.value;
            });
            return result;
        });
    }
}
//# sourceMappingURL=chucknorrisjoke.js.map
