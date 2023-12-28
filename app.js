document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.addEventListener('message', (event) => {
        const chatOutput = document.getElementById('chat-output');
        chatOutput.innerHTML += `<p>${event.data}</p>`;
    });

    socket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
    });

    function sendMessage() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value;
        socket.send(message);
        messageInput.value = '';
    }

    // Fetch and display news
    fetch('/getNews')
        .then(response => response.json())
        .then(news => {
            const newsList = document.getElementById('news-list');
            news.forEach(article => {
                newsList.innerHTML += `<li>${article.title}</li>`;
            });
        });
});
