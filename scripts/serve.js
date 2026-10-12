/* Local static host for the `output: export` build in out/.
   Usage: `npm run build`, then `npm run serve` (or
   `PORT=4000 npm run serve` to pick a port). Mirrors the production
   clean-URL behavior: /cv serves cv.html, unknown routes serve
   404.html with a 404 status. */

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "out");
const PORT = Number(process.env.PORT) || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    const p = decodeURIComponent(req.url.split("?")[0]);
    const base = path.join(ROOT, p);
    let candidates;
    if (path.extname(p)) {
      candidates = [base];
      // Client-side RSC prefetches use dotted paths that Vercel
      // serves; Windows emits them nested — mirror production.
      const m = p.match(/^(.*__next\..*)\.__PAGE__\.txt$/);
      if (m) {
        let seg = m[1];
        candidates.push(path.join(ROOT, seg + "/__PAGE__.txt"));
        while (seg.includes(".")) {
          const i = seg.lastIndexOf(".");
          seg = seg.slice(0, i) + "/" + seg.slice(i + 1);
          candidates.push(path.join(ROOT, seg + "/__PAGE__.txt"));
        }
      }
    } else {
      candidates = [base + ".html", path.join(base, "index.html")];
    }
    let status = 200;
    let file = candidates.find(
      (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()
    );
    if (!file) {
      file = path.join(ROOT, "404.html");
      status = 404;
    }
    const ext = path.extname(file);
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(status, {
        "content-type": TYPES[ext] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(PORT, () => console.log(`Serving out/ at http://localhost:${PORT}`));
