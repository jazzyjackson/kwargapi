var fs   = require('fs')
var url  = require('url')
var util = require('util')
var mime = require('mime')
var http = require('http')
var qs   = require('querystring')

http.createServer(async (request, response) => {
    try {
        let {query, pathname} = url.parse(request.url)
        let kwargs = qs.parse(query)
        let pathArray = pathname.split('/').slice(1)
        let route = pathArray.shift()
        switch(route){
            case 'static':
                response.setHeader('Content-Type', mime.getType(pathname))
                await new Promise((resolve, reject) =>
                    fs.createReadStream('.' + pathname)
                      .on('end', resolve)
                      .on('error', reject)
                      .pipe(response))
                break
            case 'api':
                response.setHeader('Content-Type', 'application/json')
                let [moduleName, functionName] = pathArray
                let result = await require(moduleName)[functionName](kwargs)
                response.end(JSON.stringify(result))
                break
            default:
                response.setHeader('Content-Type', 'text/plain')
                fs.createReadStream('./README.md').pipe(response)
        }
    } catch(error){
        response.headersSent || response.setHeader('Content-Type', 'application/json'), response.writeHead(500)
        response.writable && response.end(JSON.stringify(error))
    }
}).listen(process.env.PORT || 80)