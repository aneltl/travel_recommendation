fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation', error);
    });

    const searchInput = document.querySelector('.search-bar-input');
    const searchButton = document.querySelector('.search-button');
    const clearButton = document.querySelector('.clear-button');

    searchButton.addEventListener('click', function() {
        const userInput = searchInput.value.toLowerCase();

        console.log('User Input:', userInput);

        handleSearch(userInput);
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';

        clearResults();
    })