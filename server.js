const express = require('express');
const http = require('http');
const WebSocket = require('ws');
// const fetch = require('node-fetch');
// Change this line in your server.js file
// const fetch = require('node-fetch');

// To this dynamic import statement
import('node-fetch').then((fetch) => {
    // Now you can use fetch here
  }).catch((error) => {
    console.error('Failed to import node-fetch:', error);
  });
  

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

app.get('/getNews', async (req, res) => {
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-11-28&sortBy=publishedAt&apiKey=19341cab51894187aa10e39ad80a55d7');
        const data = await response.json();
        res.json(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
