# kwargapi
### quar gap ee
#### or "keyword arg API" cuz thats what it is

A small flask server that invokes functions described in URL, passing on querystring as **kwargs

In that case, provide a /call/ route and a /static/ route to provide a simple web server without having to know how to network.

I learned that if Object keys are strings, I can access them with a number.
And I learned that Math.max coerces input to numbers, so Math.max('4','2') works fine, returns the Number 4.

So I'm going to iterate through Object keys and check that all keys can be coerced to number, by parseInt and check if NaN
Object.keys({}).every(key => !isNaN(parseInt(key)))

Oh I also learned Math.max withougt any args is -Infinity, so I guess I should check that Math.max is >= 0.
Math.max(...Object.keys(x))

Oh hey I learned that if any keys aren't numbers than Math.max returns NaN, so I don't even have to do the every !isNaN

I can just do Math.max(...Object.keys(kwargs)) >= 0

