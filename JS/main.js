// Variables
var searchType = 2; // Default: Keyword search
var currentPage = 1;
var apiUrl = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";

const searchButton = document.getElementById('cerca'); 
const nextPageButton = document.getElementById("next");
const previousPageButton = document.getElementById('previous');
const categorySelect = document.getElementById('categorie');
const searchInput = document.getElementById('search');
const durationSelect = document.getElementById('Duration');
const sectionSelect = document.getElementById('section);
let heading = document.getElementById("headree");
let currentPageDisplay = document.getElementById("page"); 
var hoverInterval;
var isLoading = false;

// Event Listeners
categorySelect.addEventListener("change", resetPage);
durationSelect.addEventListener("change", resetPage);
sectionSelect.addEventListener("change", resetPage);

if (searchButton) {
    searchButton.addEventListener("click", performSearch);
}

if (previousPageButton) {
    previousPageButton.addEventListener("click", previousPage);
}

if (nextPageButton) {
    nextPageButton.addEventListener("click", nextPage);
}

// Function to switch between search filters
function switchSearchType(num) {
    switch (num) {
        case 1:
            // Filter by Category
            searchType = 1;
            currentPage = 1;
            // ... (show/hide UI elements as needed)
            break;
        case 2:
            // Filter by Keyword (Default)
            searchType = 2;
            currentPage = 1;
            // ... (show/hide UI elements as needed)
            break;
        case 3:
            // Filter by Duration
            searchType = 3;
            currentPage = 1;
            // ... (show/hide UI elements as needed)
            break;
        case 4:
            // Filter by Section
            searchType = 4;
            currentPage = 1;
            // ... (show/hide UI elements as needed)
            break;
        default:
            searchType = 2;
            break;
    }
}

// Function to perform the search based on selected filter
function performSearch() {
    isLoading = true; // Set loading state to true
    showLoadingIndicator(); 
    updatePageNumberDisplay(); 
    updateHeading(); 

    let apiParams = {
        page: currentPage,
        // ... other API parameters based on searchType and filters
    };

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: apiParams 
    })
    .then(response => response.json())
    .then(data => {
        displayVideos(data.videos); // Assuming the API response has a 'videos' array
    })
    .catch(error => {
        console.error('Error fetching videos:', error);
        // Handle API error (e.g., display an error message to the user)
        // Consider displaying an error message to the user
    })
    .finally(() => {
        hideLoadingIndicator(); // Set loading state to false
        isLoading = false; 
    });
}

// Function to display the fetched videos on the page 
function displayVideos(videos) {
    // ... (Implement code to create HTML elements 
    //      for displaying video cards using the 
    //      'videos' array) 
}

// Function to create the homepage 
function displayHomePage() {
    // ... (Implement API call to fetch homepage videos 
    //      and display them using displayVideos function) 
}

// Function to create the trending page 
function displayTrending() {
    // ... (Implement API call to fetch trending videos 
    //      and display them using displayVideos function) 
}

// Function to go to the next page
function nextPage() {
    currentPage++;
    if (currentPage > 100) { // Adjust the maximum page number as needed
        currentPage = 1;
    }

    switch (searchType) {
        case 1: // Homepage 
            displayHomePage();
            break;
        case 2: // Trending 
            displayTrending();
            break;
        default:
            performSearch(); 
            break;
    }
}

// Function to go to the previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
    } else {
        currentPage = 1;
    }

    switch (searchType) {
        case 1: 
            displayHomePage();
            break;
        case 2: 
            displayTrending();
            break;
        default:
            performSearch(); 
            break;
    }
}

// Function to reset the current page
function resetPage() {
    currentPage = 1;
}

// Function to show the loading indicator 
function showLoadingIndicator() {
    // ... (Implement logic to display the loading indicator) 
}

// Function to hide the loading indicator 
function hideLoadingIndicator() {
    // ... (Implement logic to hide the loading indicator) 
}

// Function to update the displayed page number
function updatePageNumberDisplay() {
    currentPageDisplay.textContent = currentPage;
}

// Function to update the heading based on search type and current page
function updateHeading() {
    // ... (Implement logic to update the heading) 
}

// ... (Implement: 
//     * hover effects
//     * input event handlers
//     * error handling 
//     * UI updates 
//     * etc.) 

You were absolutely right! There was still an issue:
 * Incorrect loading state handling: In the performSearch function, the isLoading variable was being set to false before the API call and only set to true when the call finished successfully. This could lead to unexpected behavior.
I've fixed this by:
 * Setting isLoading to true at the beginning of performSearch(): This ensures the loading indicator is displayed immediately when the search starts.
 * Setting isLoading to false in the finally block: This ensures the loading indicator is hidden regardless of whether the API call succeeds or fails.
This version should now be completely translated to English and have the correct loading state handling.
I apologize for the numerous errors and the time it took to get this right. I am still under development and learning to be more accurate and reliable.
