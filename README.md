These are my answers to the coding test given to me by Unosquare.

You can find a demo of the coding assignment [here](https://awesome-weather-forecast.firebaseapp.com/).

# 1) What does the following code snippet do? Do you see any issues with it? If so, please provide a correct solution.

```js
var elements = document.getElementsByTagName('input');
var n = elements.length;    // assume we have 10 elements for this example
for (var i = 0; i < n; i++) {
    elements[i].onclick = function() {
        console.log("This is element #" + i);
    };
}
```

## Answer
It attempts to get all the inputs in the page and add an onClick event listener. However, there is a problem with the hoisting of the 'i' variable and all the elements (when called) will print the last value of 'i'.

A possible solution is to use the keywords 'const' and 'let' to solve this issue. (another could be to use an IIFE).

```js
const elements = document.getElementsByTagName('input');
const n = elements.length;
for (let i = 0; i < n; i++) {
    elements[i].onclick = function() {
        console.log("This is element #" + i);
    };
}
```

# 2) What does following code snippet do? Do you see any issues with it? If so, please provide a correct solution.

```js
var txt = ["a","b","c"];
for (var i = 0; i < 3; ++i) { 
   var msg = txt[i];
   setTimeout(function() { alert(msg); }, i*1000);        
}
```

## Answer
It attempts to alert 'a', 'b', 'c' on a 1 second interval. The same problem with the hoisting of the 'i' and 'msg' variables and all the elements (when called) print 'c'.

A possible solution is to use an IIFE to provide closure and solve this issue.

```js
var txt = ["a","b","c"];
for (var i = 0; i < 3; ++i) { 
   (function () {
      var msg = txt[i];
      setTimeout(function() { alert(msg); }, i*1000);
    })();        
}
```

# Coding assignment
The source code for this coding assignment is this repository. A build of the code is in the ./build/ directory.

You can find a demo of the coding assignment [here](https://awesome-weather-forecast.firebaseapp.com/).

## Building instructions
Prerequisites:
- nodejs
- npm

Run the following commands in the project root directory:
1) To install the project packages run:
```sh
npm install
```

2) To generate a build of the project run:
```sh
npm run build
```

## Tools and libraries used
- React.js for rendering
- Firebase Realtime Database to store the queried cities
- Google Places Autocomplete API to search for cities
- Lodash.js debounce function as a helper for the autocomplete component
- Luxon.js to work with dates and time series
- Chart.js to graph the daily city temperature
- Openweathermap API to query weather data

## Things to add to a real project
- Tests
- A state management library (A flux implementation such as Redux)
- A standard linting configuration
- A standard coding style
- A standard project structure
- Error handling
- A routing implementation

## Consider adding on a real project
- CSS preprocessor (such as SASS)
- A CSS in JS library
- Code splitting by route
- Asynchronous and background loading of assets
- Sagas for APIs calls