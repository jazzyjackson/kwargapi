# kwargapi
### quar gap ee
#### or "keyword arg API" cuz thats what it is

A small flask server that invokes functions described in URL, passing on querystring as **kwargs

I think maybe it should just operate as its own server that you should specifically proxy requests to, maybe as a /kwargapi/ route. Will have to look up a good async threaded server library so requests aren't blocking.
