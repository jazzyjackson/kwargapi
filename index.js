var fs   = require('fs')
var url  = require('url')
var util = require('util')
var mime = require('mime')
var http = require('http')
var qs   = require('querystring')

http.createServer(async (request, response) => {
    try {
        var {query, pathname} = url.parse(request.url)
        var kwargs = qs.parse(query) 
        // discard leading blank after splitting string starting with '/'
        var pathArray = pathname.split('/').slice(1)
        // use what is now the first path part as the 'route', second and third as module name and function name, tho your route may point to a static file after all.
        let [route, moduleName, functionName] = pathArray

        switch(route){
            case 'static':
                response.setHeader('Content-Type', mime.getType(pathname))
                // await resolution just so read errors get caught by this try block
                await new Promise((resolve, reject) =>
                    fs.createReadStream('.' + pathname)
                      .on('end', resolve)
                      .on('error', reject)
                      .pipe(response))
                break
            case 'echo':
                response.setHeader('Content-Type', 'text/plain')
                let func = require(moduleName)[functionName]
                response.end(func.toString()) // here would be the place to fall back on error + readme, .toString will throw on undefined
                break
            case 'call':
                response.setHeader('Content-Type', 'application/json')
                let result = null
                if(Object.keys(kwargs).length == 0){
                    // if there are no keys, call the function without argument
                    result = await require(moduleName)[functionName]()
                } else if(Object.keys(kwargs).some(isNaN)){
                    // if some keys are non-numeric, pass the entire object as a single argument, assume function knows what to do with it
                    result = await require(moduleName)[functionName](kwargs)                    
                } else {
                    // convert object with keys into Array. {0:'zero', 3: 'three'} becomes ['zero', undefined, undefined, 'three']
                    let argvLength = Math.max(...Object.keys(kwargs)) + 1 // +1 to make up for 0 indexed, new Array(4) returns 0->3, I want it to return 0->4, 4 is a key!
                    let argv = Array.from(new Array(argvLength), (each, index) => kwargs[index])
                    result = await require(moduleName)[functionName](...argv)
                }
                // assuming function returns an object, in any case make sure it can be response.json()'d on the receiving end
                response.end(JSON.stringify(result))
                break
            default:
                response.setHeader('Content-Type', 'text/plain')
                fs.createReadStream('./README.md').pipe(response)
        }
    } catch(error){
        response.headersSent || response.setHeader('Content-Type', 'application/json'), response.writeHead(500)
        var {code, path, errno, syscall, stack, address, port} = error // because error.toString() wasn't good enough for me, I want informative JSON
        response.writable && response.end(JSON.stringify({code, path, errno, syscall, stack, address, port}))
    }
}).listen(process.env.PORT || 80)