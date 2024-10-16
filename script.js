fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('.search-button');
    const clearButton = document.querySelector('.clear-button');

    searchButton.addEventListener('click', function() {
        const userInput = searchInput.value.toLowerCase();

        console.log('User Input:', userInput);

        displayRecommendations(data, userInput);
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';

        clearResults();
    });

})

    .catch(error => {
        console.error('There was a problem with the fetch operation', error);
    });

    function displayRecommendations(data, inputValue) {
        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('results-container');

        clearResults();

        const filteredResults = data.filter(item =>
        item.name.toLowerCase().includes(inputValue));

        if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.textContent = item.name;
                resultsContainer.appendChild(resultItem);
            });

        } else {
            const noResults = document.createElement('div');
            noResults.textContent = "No results found.";
            resultsContainer.appendChild(noResults);
        }

            document.body.appendChild(resultsContainer);
    }

        function clearResults() {
            const resultsContainer = document.querySelector('.results-container');
            if (resultsContainer) {
                resultsContainer.remove();
            }
        }