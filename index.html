
// Define search type and page number
var searchType = 2;
var page = 1;

// API URL to get all videos
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";

// Get HTML elements by their IDs
const searchButton = document.getElementById('cerca');
const nextButton = document.getElementById("next");
const prevButton = document.getElementById('previous');
const categorySelect = document.getElementById('categoria');
const searchInput = document.getElementById('ricerca');
const durationSelect = document.getElementById('durata');
const sectionSelect = document.getElementById('sezione');
let header = document.getElementById("intestazione");
let pageIndex = document.getElementById("pagina");
var hoverInterval;
var loading = false;

// Add event listeners to reset the page when selections change
categorySelect.addEventListener("change", resetPage);
durationSelect.addEventListener("change", resetPage);
sectionSelect.addEventListener("change", resetPage);

// Add event listeners for buttons if they exist
if (searchButton) {
 searchButton.addEventListener("click", search);
}

if (prevButton) {
 prevButton.addEventListener("click", prev);
}

if (nextButton) {
 nextButton.addEventListener("click", next);
}

// Function to switch the search filter
function SwitchInputSelect(num) {
 switch (num) {
 case 1:
 // Category Filter
 searchType = 1;
 page = 1;
 categorySelect.className = "form-select";
 sectionSelect.className = "form-select visually-hidden";
 searchInput.className = "form-control me-2 visually-hidden";
 durationSelect.className = "form-select visually-hidden";
 break;
 case 2:
 // Keyword Filter (Default)
 searchType = 2;
 page = 1;
 categorySelect.className = "form-select visually-hidden";
 searchInput.className = "form-control searchType = 2;
 page = 1;
 categorySelect.className = "form-select visually-hidden";
 searchInput.className = "form-control searchInput.className = "form-control ontrol me-2";
 sectionSelect.className = "form-select visually-hidden";
 searchInput.placeholder = "Search";
 durationSelect.className = "form-select visually-hidden";
 break;
 case 3:
 // Duration Filter
 searchType = 3;
 page = 1;
 categorySelect.className = "form-select visually-hidden";
 sectionSelect.className = "form-select visually-hidden";
 searchInput.className = "form-control me-2 visually-hidden";
 durationSelect.className = "form-select";
 break;
 case 4:
 // Section Filter
 page = 1;
 searchType = 4;
 sectionSelect.className = "form-select";
 searchInput.className = "form-control me-2 visually-hidden";
 categorySelect.className = "form-select visually-hidden";
 durationSelect.className = "form-select visually-hidden";
 break;
 default:
 searchType = 2;
 break;
 }
}

// Function to perform a search based on the selected filter
function search() {
 loading = false;
 load();
 changePage();
 if (page == 1) {
 header.innerHTML = "Latest Releases";
 prevButton.className = "btn btn-outline-warning disabled";
 } else {
 prevButton.className = "btn btn-outline-warning";
 nextButton.className = "btn btn-outline-warning";
 }
 switch (searchType) {
 case 1:
 console.log("Search by Category");
 let category = document.getElementById("categoria").value;
 header.innerHTML = "";
 console.log(category);
 fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&lq=1&format=json&per_page=30&query=" + category, {
 "method": "GET",
 "headers": {
 "Accept": "application/json"
 }
 })
 .then(response => response.json())
 .then(result => { printCards(result) })
 .catch(error =>