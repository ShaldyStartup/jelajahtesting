const http=require('http'),fs=require('fs'),path=require('path');
const root=process.cwd();
http.createServer((req,res)=>{
  const relative=decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '')||'index.html';
  const file=path.resolve(root,relative);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  fs.readFile(file,(error,body)=>{
    if(error){res.writeHead(404);res.end('Not found');return}
    res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
    res.end(body);
  });
}).listen(4173,'127.0.0.1',()=>console.log('Jelajah running at http://127.0.0.1:4173'));
