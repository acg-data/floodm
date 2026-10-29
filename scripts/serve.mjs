// Zero-dependency preview server for the built site (dist/). Prints a LAN address so you can
// open it on a phone on the same Wi-Fi. Usage: npm run build && npm start
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { networkInterfaces } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const portArg = process.argv.indexOf('--port');
const port = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT || 8080);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};

export function startServer(p = port, host = '0.0.0.0') {
  const server = createServer(async (req, res) => {
    let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    let file = join(root, path);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
      res.setHeader('content-type', types[extname(file)] ?? 'application/octet-stream');
      res.end(await readFile(file));
    } catch {
      res.statusCode = 404;
      res.setHeader('content-type', types['.html']);
      res.end(await readFile(join(root, '404.html')));
    }
  });
  return new Promise((resolve) => server.listen(p, host, () => resolve(server)));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await startServer();
  const lan = Object.values(networkInterfaces()).flat().find((n) => n && n.family === 'IPv4' && !n.internal);
  console.log(`Flood Mitigators preview:\n  this computer: http://localhost:${port}`);
  if (lan) console.log(`  your phone (same Wi-Fi): http://${lan.address}:${port}`);
}
