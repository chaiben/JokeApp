"use strict";
const JOKEURL = 'https://icanhazdadjoke.com/';
const getJoke = document.querySelector('#get-joke');
getJoke === null || getJoke === void 0 ? void 0 : getJoke.addEventListener('click', () => {
    fetch(JOKEURL,{
        headers: {
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
});
//# sourceMappingURL=index.js.map