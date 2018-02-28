# kwargapi
### quar gap ee
#### or "keyword arg API" cuz thats what it is

A small flask server that invokes functions described in URL, passing on querystring as **kwargs

I think maybe it should just operate as its own server that you should specifically proxy requests to, maybe as a /kwargapi/ route. I'll use AIOHTTP to handle concurrent requests, I think. Or Tornado ? Either way, each request, spawn a thread to process a single requests, but many requests at once!

In that case, provide a /kwargi/ route and a /static/ route to provide a simple web server without having to know how to network.
