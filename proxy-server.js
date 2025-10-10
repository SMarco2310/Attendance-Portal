const http = require('http');
const https = require('https');

const PORT = 3000;
const API_BASE = 'http://169.239.251.102:341/~marc.sossou/api';

const server = http.createServer((req, res) => {
    // Enable CORS for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Route requests
    let apiPath = '';
    if (req.url.includes('students')) {
        apiPath = '/students.json';
    } else if (req.url.includes('courses')) {
        apiPath = '/courses.json';
    } else if (req.url.includes('sessions')) {
        apiPath = '/sessions.json';
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    // Proxy the request
    const apiUrl = `${API_BASE}${apiPath}`;
    console.log(`Proxying request to: ${apiUrl}`);

    http.get(apiUrl, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.writeHead(apiRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(data);
        });
    }).on('error', (error) => {
        console.error('Proxy error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy error', message: error.message }));
    });
});

server.listen(PORT, () => {
    console.log(`CORS Proxy server running at http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log(`  - http://localhost:${PORT}/students`);
    console.log(`  - http://localhost:${PORT}/courses`);
    console.log(`  - http://localhost:${PORT}/sessions`);
});
