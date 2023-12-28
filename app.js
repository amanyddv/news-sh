document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display news
    fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-11-28&sortBy=publishedAt&apiKey=19341cab51894187aa10e39ad80a55d7')
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('news-list');
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const li = document.createElement('li');
                    li.innerHTML = `<h3>${article.title}</h3><p>${article.description}</p>`;
                    newsList.appendChild(li);
                });
            } else {
                newsList.innerHTML = '<li>No news available</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            const newsList = document.getElementById('news-list');
            newsList.innerHTML = '<li>Error fetching news</li>';
        });
});
