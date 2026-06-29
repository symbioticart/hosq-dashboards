// Minimal static server for HOSQ dashboards (Render Node path + local preview).
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml',
  '.woff':'font/woff','.woff2':'font/woff2','.png':'image/png','.ico':'image/x-icon'};

http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, path.normalize(p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
      return res.end('<h1>404</h1><a href="/index.html">HOSQ dashboards</a>'); }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': p.startsWith('/data/') ? 'no-cache' : 'public, max-age=3600'});
    res.end(buf);
  });
}).listen(PORT, () => console.log('HOSQ dashboards on http://localhost:'+PORT));
