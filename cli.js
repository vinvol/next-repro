const { createServer } = require("http");
const path = require("path");
const { parse } = require("url");
const next = require("next");

// const dir = path.resolve(__dirname, "..");
const dir = path.resolve(__dirname);

const dev = false; // process.env.NODE_ENV !== "production";

const startServer = ({ matrix, transitiveClosure, fileSizes }) => {
    const app = next({
        dev,
        dir
    });
    const handle = app.getRequestHandler();
    app.prepare().then(() => {
        createServer((req, res) => {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;

            if (pathname === "/api/matrix") {
                res.end(JSON.stringify(matrix));
            } else if (pathname === "/api/transitive-closure") {
                res.end(JSON.stringify(transitiveClosure));
            } else if (pathname === "/api/file-sizes") {
                res.end(JSON.stringify(fileSizes));
            } else {
                handle(req, res, parsedUrl);
            }
        }).listen(3000, (err) => {
            if (err) throw err;
            console.log("> Ready on http://localhost:3000");
        });
    });
};

startServer({ matrix: "", transitiveClosure: "", fileSizes: "" });
// process.exit(0);
