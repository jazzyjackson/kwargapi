# kwargapi
### quar gap ee
#### or "keyword arg API" cuz thats what it is

### Standalone branch
I'm going to abandon this for now, but I was playing with the idea for this to be a standalone HTTP "Simple Server" that servers static files and gives access to classes, but it would be a little fragile to make secure, and I just kept coming up with more features to add to it, so I want to set it aside and work on master branch: nothing but execute functions

In that case, provide a /call/ route and a /static/ route to provide a simple web server without having to know how to network.

I learned that if Object keys are strings, I can access them with a number.
And I learned that Math.max coerces input to numbers, so Math.max('4','2') works fine, returns the Number 4.

So I'm going to iterate through Object keys and check that all keys can be coerced to number, by parseInt and check if NaN
Object.keys({}).every(key => !isNaN(parseInt(key)))

Oh I also learned Math.max withougt any args is -Infinity, so I guess I should check that Math.max is >= 0.
Math.max(...Object.keys(x))

Oh hey I learned that if any keys aren't numbers than Math.max returns NaN, so I don't even have to do the every !isNaN

I can just do Math.max(...Object.keys(kwargs)) >= 0

