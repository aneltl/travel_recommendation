 document.querySelector('.search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = ''; 
            const allResults = [...data.countries, ...data.temples, ...data.beaches];
            const filteredResults = allResults.filter(item => 
                item.name.toLowerCase().includes(query)
            );

            filteredResults.forEach(item => {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                `;
                resultsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
 