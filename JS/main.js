
var searchType = 2;
var page = 1;
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('search');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategory = document.getElementById('category');
const searchInput = document.getElementById('search');
const selectDuration = document.getElementById('duration');
const selectSection = document.getElementById('section');
let header = document.getElementById("header");
let pageIndex = document.getElementById("page");
var hoverInterval;
var loading = false;

selectCategory.addEventListener("change", resetPage);
selectDuration.addEventListener("change", resetPage);
selectSection.addEventListener("change", resetPage);

if (btn) {
    btn.addEventListener("click", search);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}

// Function to perform the search based on the selected filter
function search() {
    loading = false;
    load();
    changePage();
    if (page == 1) {
        header.innerHTML = "Latest Releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    switch (searchType) {
        case 1:
            // Search by category logic
            break;
        case 2:
            // Search by keyword logic
            break;
        case 3:
            // Search by duration logic
            break;
        case 4:
            // Search by section logic
            break;
        default:
            document.getElementById("search").value = "";
            break;
    }
}

// Function to print the cards
function printCards(result) {
    console.log(result);
    let videoArray = result.videos;
    let videoCards = document.getElementById('video');

    videoCards.innerHTML = "";
    btnNext.className = "btn btn-outline-warning";
    if (videoArray.length == 0) {
        header.innerHTML = "No results found";
        btnNext.className = "btn btn-outline-warning disabled";
        return;
    }
    
    videoArray.forEach((video, index) => {
        const wrapper = document.createElement(`div`);
        wrapper.className = `col`;

        const card = document.createElement(`div`);
        card.className = `card`;

        // Open in media player
        card.addEventListener(`click`, (ev) => {
            const videoUrl = video.embed; // Ensure this is a direct link to the video file
            
            console.log("Video URL:", videoUrl); // Log the URL for debugging

            // Check if the video URL is a direct link
            if (isDirectVideoUrl(videoUrl)) {
                location.href = videoUrl; // Open the video URL directly
            } else {
                alert("Invalid video URL. Please check the link.");
            }
        });

        const cardImg = document.createElement(`img`);
        cardImg.src = video.default_thumb.src;
        cardImg.className = `card-img-top`;

        card.append(cardImg);
        wrapper.append(card);
        videoCards.append(wrapper);
    });

    loading = true;
    setTimeout(() => {
        load();
    }, 800);
}

// Function to check if a URL is a direct video file link
function isDirectVideoUrl(url) {
    return /\.(mp4|mov|avi|mkv|wmv|flv)$/i.test(url); // Add more formats as necessary
}

// Function to create the homepage when loading the index page
function CreateHome() {
    window.scrollTo(top);
    loading = false;
    load();
    if (page == 1) {
        header.innerHTML = "Latest Releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    changePage();
    console.log("Create Home");
    searchType = 5;
    fetch("https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=" + page + "&per_page=30", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    })
    .then(response => response.json())
    .then(result => { printCards(result) })
    .catch(error => console.log('Error:', error));
    changePage();
}

// Additional functions (CreateTrending, printTitle, etc.) remain unchanged...

// Function to reset the page
function resetPage() {
    page = 1;
}
