// Variables
var searchType = 2;
var page = 1;
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('search');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategory = document.getElementById('category');
const searchInput = document.getElementById('search-input');
const selectDuration = document.getElementById('duration');
const selectSection = document.getElementById('section');
let header = document.getElementById("header");
let pageIndex = document.getElementById("page");
var hoverInterval;
var loading = false;

// Event Listeners
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

// Function to change the search filter
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            searchType = 1;
            page = 1;
            selectCategory.className = "form-select";
            selectSection.className = "form-select visually-hidden";
            searchInput.className = "form-control me-2 visually-hidden";
            selectDuration.className = "form-select visually-hidden";
            break;
        case 2:
            searchType = 2;
            page = 1;
            selectCategory.className = "form-select visually-hidden";
            searchInput.className = "form-control me-2";
            selectSection.className = "form-select visually-hidden";
            searchInput.placeholder = "Search";
            selectDuration.className = "form-select visually-hidden";
            break;
        case 3:
            searchType = 3;
            page = 1;
            selectCategory.className = "form-select visually-hidden";
            selectSection.className = "form-select visually-hidden";
            searchInput.className = "form-control me-2 visually-hidden";
            selectDuration.className = "form-select";
            break;
        case 4:
            searchType = 4;
            page = 1;
            selectSection.className = "form-select";
            searchInput.className = "form-control me-2 visually-hidden";
            selectCategory.className = "form-select visually-hidden";
            selectDuration.className = "form-select visually-hidden";
            break;
        default:
            searchType = 2;
            break;
    }
}

// Function to perform the search based on selected filter
function search() {
    loading = false;
    load();
    updatePage();
    if (page == 1) {
        header.innerHTML = "Latest Releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    switch (searchType) {
        case 1:
            console.log("Search by Category");
            let category = document.getElementById("category").value;
            header.innerHTML = "";
            console.log(category);
            fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&lq=1&format=json&per_page=30&query=${category}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response => response.json())
            .then(result => { printCards(result) })
            .catch(error => console.log('Error:', error));
            header.innerHTML = `Page <span id="category">${page}</span>`;
            break;
        case 2:
            console.log("Search by Keyword");
            let keyword = document.getElementById("search-input").value;
            console.log(keyword);
            fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&lq=1&format=json&order=latest&per_page=30&query=${keyword}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response => response.json())
            .then(result => { printCards(result) })
            .catch(error => console.log('Error:', error));
            header.innerHTML = `Search results for <span id='search-input'>${keyword}</span>`;
            break;
        case 3:
            console.log("Search by Duration");
            header.innerHTML = "";
            let time = document.getElementById("duration").value;
            header.innerHTML = time == "longest" ? "Searching for Long Videos" : "Searching for Short Videos";
            fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&order=${time}&lq=0&format=json&per_page=30`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response => response.json())
            .then(result => { printCards(result) })
            .catch(error => console.log('Error:', error));
            break;
        case 4:
            console.log("Search by Section");
            header.innerHTML = "";
            let section = document.getElementById("section").value;
            console.log(section);
            let url;
            if (section == "straight") {
                url = `https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=${page}`;
            } else if (section == "gay") {
                url = `https://www.eporner.com/api/v2/video/search/?page=${page}&per_page=30&format=json&lq=1&gay=2`;
            } else {
                url = `https://www.eporner.com/api/v2/video/search/?page=${page}&per_page=30&format=json&lq=1&query=${section}`;
            }
            fetch(url, {
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(response => response.json())
            .then(result => { printCards(result) })
            .catch(error => console.log('Error:', error));
            break;
        default:
            document.getElementById("search-input").value = "";
            break;
    }
}

// Function to print the video cards
function printCards(result) {
    console.log(result);
    let videoArray = result.videos;
    let videoGrid = document.getElementById('video');

    videoGrid.innerHTML = "";
    btnNext.className = "btn btn-outline-warning";
    if (videoArray.length == 0) {
        header.innerHTML = "No Results Found";
        btnNext.className = "btn btn-outline-warning disabled";
        return;
    }

    videoArray.forEach((video, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'col';

        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => window.open(video.embed));

        const cardImg = document.createElement('img');
        cardImg.src = video.default_thumb.src;
        cardImg.className = 'card-img-top';

        const cardDescription = document.createElement('div');
        cardDescription.className = 'card-description';

        const h2 = document.createElement('h2');
        h2.className = 'card-title';
        h2.textContent = shortenTitle(video.title, 60);

        const p = document.createElement('p');
        p.className = 'card-text';

        const spanViews = document.createElement('span');
        spanViews.className = 'card-text';
        spanViews.id = 'n-views';

        const imgViews = document.createElement('img');
        imgViews.src = '/img/eye.png';
        imgViews.id = 'views';

        const spanViewsText = document.createElement('span');
        spanViewsText.textContent = video.views;

        const spanTime = document.createElement('span');
        spanTime.className = 'card-text';
        spanTime.id = 'time';

        const imgTime = document.createElement('img');
        imgTime.src = '/img/clock-circular-outline.png';
        imgTime.id = 'clock';

        const spanTimeText = document.createElement('span');
        spanTimeText.textContent = video.length_min;

        card.append(cardImg);
        card.append(cardDescription);
        cardDescription.append(h2);
        wrapper.append(card);
        videoGrid.append(wrapper);

        spanViews.append(imgViews, spanViewsText);
        spanTime.append(imgTime, spanTimeText);
        p.append(spanViews, spanTime);
        cardDescription.append(p);

        card.onmouseover = function () {
            clearInterval(hoverInterval);
            changeImageOnHover(this, video.thumbs[0].src);
        };
        card.onmouseleave = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, shortenTitle(video.title, 65));
        };
        card.ontouchstart = function () {
            clearInterval(hoverInterval);
            changeImageOnHover(this, video.thumbs[0].src);
        };
        card.ontouchend = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, shortenTitle(video.title, 65));
        };
    });
    loading = true;
    setTimeout(load, 800);
}

// Helper Functions
function shortenTitle(text, length) {
    return text.split('').slice(0, length).join('');
}

function next() {
    window.scrollTo(0, 0);
    header.innerHTML = "";
    if (page > 0 && page < 100) page++;
    else page = 1;
    
    switch (searchType) {
        case 5:
            createHome();
            break;
        case 6:
            createTrending();
            break;
        default:
            search();
            break;
    }
}

function prev() {
    window.scrollTo(0, 0);
    header.innerHTML = "";
    if (page > 1 && page < 100) page--;
    else page = 1;
    
    switch (searchType) {
        case 5:
            createHome();
            break;
        case 6:
            createTrending();
            break;
        default:
            search();
            break;
    }
}

function changeImageOnHover(cardElement, thumbBase) {
    let i = 2, prev = 1;
    let start = thumbBase;
    hoverInterval = setInterval(() => {
        let url = thumbBase.replace(prev + "_", i + "_");
        cardElement.querySelector('img').src = url;
        thumbBase = url;
        if (i === 15 || prev === 14) {
            i = 2;
            prev = 1;
            thumbBase = start;
        } else {
            i++;
            prev++;
        }
    }, 350);
}

function setDefaultImage(card, thumb, title) {
    card.querySelector('img').src = thumb;
    card.querySelector('h2').textContent = title;
    card.querySelector('p').classList.remove("visually-hidden");
}

function createHome() {
    window.scrollTo(0, 0);
    loading = false;
    load();
    if (page == 1) {
        header.innerHTML = "Latest Releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    updatePage();
    console.log("Create Home");
    searchType = 5;
    fetch(`https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=${page}&per_page=30`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    })
    .then(response => response.json())
    .then(result => { printCards(result) })
    .catch(error => console.log('Error:', error));
}

function createTrending() {
    window.scrollTo(0, 0);
    loading = false;
    load();
    updatePage();
    if (page == 1) {
        header.innerHTML = `<h1><span><img src="./img/campfire.png" alt="" id="icon"></span> Trending <span><img src="./img/campfire.png" alt="" id="icon"></span></h1>`;
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    console.log("Create Trending");
    searchType = 6;
    fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&order=top-weekly&lq=0&format=json&per_page=30`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    })
    .then(response => response.json())
    .then(result => { printCards(result) })
    .catch(error => console.log('Error:', error));
}

function updatePage() {
    pageIndex.textContent = page;
}

function load() {
    let videoGrid = document.getElementById('cardGrid');
    let loadingDiv = document.getElementById("loading");
    if (loading) {
        loadingDiv.className = "container-fluid visually-hidden";
        videoGrid.className = "container-fluid";
    } else {
        loadingDiv.className = "container-fluid";
        videoGrid.className = "container-fluid visually-hidden";
    }
}

function resetPage() {
    page = 1;
}

// Handling Enter key press for inputs
["category", "search-input", "duration", "section"].forEach(id => {
    document.getElementById(id).addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn.click();
        }
    });
});