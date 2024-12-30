// Variables
let searchType = 2; // Default: Keyword search
let currentPage = 1;
const apiUrl = "https://api.example.com/video/search"; // Replace with your actual API URL
let searchButton = document.getElementById('searchBtn');
let nextPageButton = document.getElementById('nextPageBtn');
let previousPageButton = document.getElementById('previousPageBtn');
let categorySelect = document.getElementById('categorySelect');
let keywordInput = document.getElementById('keywordInput');
let durationSelect = document.getElementById('durationSelect');
let sectionSelect = document.getElementById('sectionSelect');
let heading = document.getElementById('heading');
let currentPageDisplay = document.getElementById('currentPageDisplay');
let hoverInterval;
let isLoading = false;

// Event Listeners
categorySelect.addEventListener("change", resetPage);
durationSelect.addEventListener("change", resetPage);
sectionSelect.addEventListener("change", resetPage);

if (searchButton) {
  searchButton.addEventListener("click", performSearch);
}

if (nextPageButton) {
  nextPageButton.addEventListener("click", nextPage);
}

if (previousPageButton) {
  previousPageButton.addEventListener("click", previousPage);
}

keywordInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    performSearch();
  }
});

// Functions

function switchSearchType(type) {
  searchType = type;

  // Show/hide relevant UI elements based on searchType
  // ... (Implement based on your UI design)

  resetPage(); 
}

function performSearch() {
  isLoading = false;
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
  })
  .finally(() => {
    hideLoadingIndicator();
  });
}

function displayVideos(videos) {
  // ... (Implementation for creating and displaying video cards) 
}

function formatTitle(title, maxWords) {
  // ... (Implementation for shortening the title) 
}

function nextPage() {
  currentPage++;
  if (currentPage > 100) { // Adjust the maximum page number as needed
    currentPage = 1;
  }

  if (searchType === 1) { // Homepage 
    displayHomePage();
  } else if (searchType === 2) { // Trending 
    displayTrending();
  } else {
    performSearch(); 
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
  } else {
    currentPage = 1;
  }

  if (searchType === 1) { 
    displayHomePage();
  } else if (searchType === 2) { 
    displayTrending();
  } else {
    performSearch(); 
  }
}

function displayHomePage() {
  // ... (Implementation for fetching and displaying homepage videos) 
}

function displayTrending() {
  // ... (Implementation for fetching and displaying trending videos) 
}

function resetPage() {
  currentPage = 1;
}

function showLoadingIndicator() {
  // ... (Implementation for displaying the loading indicator) 
}

function hideLoadingIndicator() {
  // ... (Implementation for hiding the loading indicator) 
}

function updatePageNumberDisplay() {
  currentPageDisplay.textContent = currentPage;
}

function updateHeading() {
  // ... (Implementation for updating the heading based on searchType and current page) 
}

// ... (Implement hover effect handling, UI updates, etc.) 

Explanation:
 * Variables: Defined variables to store search type, current page, API URL, references to UI elements, and state flags.
 * Event Listeners: Attached event listeners to UI elements for user interactions (e.g., button clicks, selection changes).
 * switchSearchType(): This function handles the logic to change the search type, update the UI, and reset the page.
 * performSearch():
   * Sets isLoading to false.
   * Displays the loading indicator.
   * Updates the page number display and heading.
   * Constructs the API URL with the necessary parameters based on the search type and filters.
   * Fetches data from the API.
   * Calls displayVideos() to render the fetched videos.
   * Hides the loading indicator.
 * displayVideos():
   * Clears any existing video displays.
   * Iterates through the array of videos and creates HTML elements for each video card.
   * Populates each card with video information (title, thumbnail, etc.).
   * Adds the cards to the page.
 * nextPage() and previousPage():
   * Increment/decrement currentPage with appropriate bounds.
   * Call the relevant function (
