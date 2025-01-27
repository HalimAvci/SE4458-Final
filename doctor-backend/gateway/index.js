const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();


app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://backend:5001',
        changeOrigin: true,
    })
);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
