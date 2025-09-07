const http = require("http")
const httpProxy = require("http-proxy")
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { prototype } = require("events");
const { json } = require("stream/consumers");

const proxy = httpProxy.createProxyServer({});
const cache = {};
const CACHE_DIR = path.join(__dirname, '../cache');

if(!fs.existsSync(CACHE_DIR)){
    fs.mkdirSync(CACHE_DIR);
    console.log('Creating folder for caching...', CACHE_DIR)
} else{
    console.log('Caching folder already exist, ready for use...')
}

const server = http.createServer((req, res) => {
    const target = `http://${req.headers.host}`
    const file_name = crypto.createHash("md5").update(req.url).digest("hex");
    const cache_path = path.join(CACHE_DIR, file_name);

    console.log("\nRequest to -> ",req.url)

    if (fs.existsSync(cache_path)) {
        console.log("\n[CACHED HIT]", req.url);
        console.log("[GETTING FILE] ->", file_name)

        const cacheData = fs.readFileSync(cache_path);
        res.writeHead(200)
        res.end(cacheData);
    } else {
        console.log("\n[CACHE CREATE]", req.url);
        console.log("[CREATE FILE] ->", file_name)
        proxy.web(req, res, { target }, (e) => console.error(e));

        proxy.once("proxyRes", (proxyRes, req, res) => {
            let body = [];
            proxyRes.on("data", (chunk) => body.push(chunk));
            proxyRes.on("end", () => {
                const data = Buffer.concat(body);

                fs.writeFileSync(cache_path, data);
                console.log("[CACHE SAVED]", cache_path);
            });
        });
    }
});

server.listen(50005, ()=>{
    console.log("Proxy Cache Server running on port 50005");
})
