document.querySelector('.search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = '';

            let recommendations = [];

            if (query.includes('beach')) {
                recommendations = data.beaches;
            } else if (query.includes('temple')) {
                recommendations = data.temples;
            } else if (query.includes('country')) {
                recommendations = data.countries.map(country => ({
                    name: country.name,
                    imageUrl: country.cities[0].imageUrl,
                    description: country.cities.map(city => city.description).join(', ')
                }));
            }

            if (recommendations.length === 0) {
                resultsContainer.innerHTML = '<p>No recommendations found</p>';
            } else {
                recommendations.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'result-card';
                    card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    `;
                    resultsContainer.appendChild(card);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.querySelector('.clear-button').addEventListener('click', clearResults);

function clearResults() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    document.getElementById('search-input').value = '';
}