
var searchType = 2; // Default search type (keyword)
var page = 1; // Current page
var apiUrlGetAll = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_page=30"; // Base API URL

const searchBtn = document.getElementById('cerca');
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById('previous');
const categorySelect = document.getElementById('categoria');
const searchInput = document.getElementById('ricerca');
const durationSelect = document.getElementById('durata');
const sectionSelect = document.getElementById('sezione');
let header = document.getElementById("intestazione");
let pageIndex = document.getElementById("pagina");
var hoverInterval;
var loading = false;

categorySelect.addEventListener("change", resetPage);
durationSelect.addEventListener("change", resetPage);
sectionSelect.addEventListener("change", resetPage);

if (searchBtn) {
 searchBtn.addEventListener("click", performSearch);
}

if (prevBtn) {
 prevBtn.addEventListener("click", previousPage);
}

if (nextBtn) {
 nextBtn.addEventListener("click", nextPage);
}

// Function to change the search filter
function switchInputSelect(num) {
 switch (num) {
 case 1:
 // Category Filter
 searchType = 1;
 page = 1;
 categorySelect.className = "form-select";
 sectionSelect.className = orySelect.className = "form-select";
 sectionSelect.className = lassName = "form-select visually-hidden";
 searchInput.className = "form-control me-2 visually-hidden";
 durationSelect.className = "form-select visually-hidden";
 break;
 case 2:
 // Keyword Filter (Default)
 searchType = 2;
 page = 1;
 categorySelect.className = "form-select visually-hidden";
 searchInput.className = "form-control me-2";
 sectionSelect.className = "form-select visually-hidden";
 searchInput.placeholder = "Search";
 durationSelect.className = "form-select visually-hidden";
 break;
 case 3:
 // Duration Filter
 searchType = 3;
 page = 1;
 categorySelect.className = "form-select visually-hidden";
 ";
 break;
 case 3:
 // Duration Filter
 searchType = 3;
 page = 1;
 categorySelect.className = "form-select visually-hidden";
 categorySelect.className = "form-select visually-hidden";
 ;
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

// Function to perform the search based on the selected filter
function performSearch() {
 loading = true;
 load();
 updatePageControls();

 switch (searchType) {
 case 1:
 console.log("Searching by category");
 let category = categorySelect.value;
 fetch(apiUrlGetAll + "&query=" + category + "&page=" + page)
 ols();

 switch (searchType) {
 case 1:
 console.log("Searching by category");
 let category = categorySelect.value;
 fetch(apiUrlGetAll + "&query=" + category + "&page=" + page)
 + "&query=" + category + "&page=" + page)
 .then(handleResponse)
 .then(result => { displayCards(result) })
 .catch(handleError);
 header.innerHTML = "Category search for: <span id='search'>" + category + "</span>";
 break;
 case 2:
 console.log("Searching by keyword");
 let keyword = searchInput.value;
 fetch(apiUrlGetAll + "&query=" + keyword + "&page=" + page)
 .then(handleResponse)
 .then(result => { displayCards(result) })
 .catch(handleError);
 header.innerHTML = "Keyword search for: <span id='search'>" + keyword + "</span>";
 break;
 case 3:
 console.log("Searching by duration");
 let duration = durationSelect.value;
 fetch(apiUrlGetAll + "&order=" + duration >" + keyword + "</span>";
 break;
 case 3:
 console.log("Searching by duration");
 let duration = durationSelect.value;
 fetch(apiUrlGetAll + "&order=" + duration fetch(apiUrlGetAll + "&order=" + duration