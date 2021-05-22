const http = require("http");
var proxy = require("http-proxy").createProxyServer({});
const { parse } = require("url");
proxy.on("proxyRes", function (proxyRes, req, res) {
  console.log(`proxyRes: ${req.url}`, res.statusCode, res.statusMessage);
});

function testShouldProxy(url) {
  return url.pathname === "" || url.pathname === "/" || (url.pathname.match(/\.html$/) && !url.pathname.match(/PCA/));
}
http
  .createServer(function (req, res) {
    const url = parse(req.url);
    if (testShouldProxy(url)) {
      console.log(`serving ${url.pathname} locally`);
      proxy.web(req, res, { target: "http://localhost:3333" });
    } else {
      console.log(`forwarding ${url.pathname}`);
      proxy.web(
        req,
        res,
        { target: "http://pdxcleanair.org", followRedirects: true, xfwd: true, changeOrigin: true, hostRewrite: true },
        (e) => {
          console.error(e);
        }
      );
    }
  })
  .listen(3000);
