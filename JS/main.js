
var searchType = 2;
var page = 1;
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('search');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategory = document.getElementById('category');
const search = document.getElementById('searchInput');
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
    btn.addEventListener("click", searchVideos);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}

// Function to change the search filter
function switchInputSelect(num) {
    switch (num) {
        case 1:
            // Category Filter
            searchType = 1;
            page = 1;
            selectCategory.className = "form-select";
            selectSection.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDuration.className = "form-select visually-hidden";
            break;
        case 2:
            // Keyword Filter (Default)
            searchType = 2;
            page = 1;
            selectCategory.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSection.className = "form-select visually-hidden";
            search.placeholder = "Search";
            selectDuration.className = "form-select visually-hidden";
            break;

        case 3:
            // Duration Filter
            searchType = 3;
            page = 1;
            selectCategory.className = "form-select visually-hidden";
            selectSection.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDuration.className = "form-select";
            break;
        case 4:
            // Section Filter
            page = 1;
            searchType = 4;

            selectSection.className = "form-select";
            search.className = "form-control me-2 visually-hidden";
            selectCategory.className = "form-select visually-hidden";
            selectDuration.className = "form-select visually-hidden";
            break;
        default:
            searchType = 2;
            break;
    }
}

// Function to search based on the selected filter
function searchVideos() {
    loading = false;
    load();
    changePage();
    if (page == 1) {
        header.innerHTML = "Latest releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    switch (searchType) {
        case 1:
            searchType = 1;
            console.log("Search by category");
            let category = document.getElementById("category").value;
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
                .catch(error => console.log('Error:', error));
            header.innerHTML = `Page <span id="category">${page}</span>`;
            break;
        case 2:
            searchType = 2;
            header.innerHTML = "";
            console.log("Search by Keyword");
            let keyword = document.getElementById("searchInput").value;
            console.log(keyword);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&lq=1&format=json&order=latest&per_page=30&query=" + keyword, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { printCards(result) })
                .catch(error => console.log('Error:', error));
            header.innerHTML = "Search results for <span id='searchInput'>" + keyword + "</span>";
            break;
        case 3:
            console.log("Search by Duration");
            header.innerHTML = "";
            let time = document.getElementById("duration").value;
            if (time == "longest") {
                header.innerHTML = "Search for <span id='searchInput'>Long Videos</span>";
            } else {
                header.innerHTML = "Search for <span id='searchInput'>Short Videos</span>";
            }

            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&order=" + time + "&lq=0&format=json&per_page=30", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
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
            if (section == "hetero") {
                fetch("https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=" + page, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { printCards(result) })
                    .catch(error => console.log('Error:', error));

            } else if (section == "gay") {

                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&gay=2", {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { printCards(result) })
                    .catch(error => console.log('Error:', error));
            } else {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&query=" + section, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { printCards(result) })
                    .catch(error => console.log('Error:', error));
            }
            break;
        default:
            document.getElementById("searchInput").value = "";
            break;
    }
}

// Function to print video cards
function printCards(result) {

    console.log(result);
    let videoArray = result.videos;
    let videoCards = document.getElementById('videos');

    videoCards.innerHTML = "";
    btnNext.className = "btn btn-outline-warning";
    if (videoArray.length == 0) {
        header.innerHTML = "No results found";
        btnNext.className = "btn btn-outline-warning disabled";
        return;
    }
    // Print the cards
    videoArray.forEach((video, index) => {
        const wrapper = document.createElement(`div`);
        wrapper.className = `col`;

        const card = document.createElement(`div`);
        card.className = `card`;
        card.addEventListener(`click`, (ev) => window.open(video.embed));

        const p = document.createElement(`p`);
        p.className = `card-text`;

        const cardImg = document.createElement(`img`);
        cardImg.src = video.default_thumb.src;
        cardImg.className = `card-img-top`;

        card.onmouseover = function () {
            clearInterval(hoverInterval);
            changeImageOnHover(this, videoArray[index].thumbs[0].src)
        };
        card.onmouseleave = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, printTitle(videoArray[index].title, 65))
        };
        card.ontouchstart = function () {
            clearInterval(hoverInterval)
            changeImageOnHover(this, videoArray[index].thumbs[0].src)
        };
        card.ontouchend = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, printTitle(videoArray[index].title, 65))
        };

        const cardDescription = document.createElement(`div`);
        cardDescription.className = `card-description`;

        const h2 = document.createElement(`h2`);
        h2.className = `card-title`;
        h2.textContent = printTitle(videoArray[index].title, 60);

        const spanViews = document.createElement(`span`);
        spanViews.className = `card-text`;
        spanViews.id = `n-views`;

        const imgViews = document.createElement(`img`);
        imgViews.src = `/img/eye.png`;
        imgViews.id = `views`;

        const spanTime = document.createElement(`span`);
        spanTime.className = `card-text`;
        spanTime.id = `time`;

        const imgTime = document.createElement(`img`);
        imgTime.src = `/img/clock-circular-outline.png`;
        imgTime.id = `clock`;

        const spanViewsText = document.createElement(`span`);
        spanViewsText.textContent = video.views;

        const spanTimeText = document.createElement(`span`);
        spanTimeText.textContent = video.length_min;

        card.append(cardImg);
        card.append(cardDescription);
        cardDescription.append(h2);
        wrapper.append(card);
        videoCards.append(wrapper);

        spanViews.append(imgViews);
        spanViews.append(spanViewsText);

        spanTime.append(imgTime);
        spanTime.append(spanTimeText);

        p.append(spanViews);
        p.append(spanTime);

        cardDescription.append(p);
    });
    loading = true;
    setTimeout(function () {
        load();
    }, 800);
}

// Function to create the homepage when loading the index page
function createHome() {
    window.scrollTo(top);
    loading = false;
    load();
    if (page == 1) {
        header.innerHTML = "Latest releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    changePage();
    console.log("Create Home");
    searchType = 5;
    fetch("https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=" + page + "&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { printCards(result) })
        .catch(error => console.log('Error:', error));
    changePage();
}

// Function to create the trending page when loading the trending page
function createTrending() {
    loading = false;
    load();
    window.scrollTo(top);
    changePage();
    if (page == 1) {
        header.innerHTML = ` <h1 id="header"><span><img src="./img/campfire.png" alt="" id="icons"></span>Trending<span><img
        src="./img/campfire.png" alt="" id="icons"></span></h1>`;
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    console.log("Create Trending");
    searchType = 6;
    fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&order=top-weekly&lq=0&format=json&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { printCards(result) })
        .catch(error => console.log('Error:', error));
}

// Function to print the video title with a character limit
function printTitle(text, wordLimit) {
    let words = text.split('');
    let wordsToPrint = words.slice(0, wordLimit).join('');
    return wordsToPrint;
}

// Function to go to the next page
function next() {
    window.scrollTo(top);
    header.innerHTML = "";
    console.log(searchType);
    if (page > 0 && page < 100) {
        page++;
    } else {
        page = 1;
    }
    switch (searchType) {
        case 5:
            createHome();
            break;
        case 6:
            createTrending();
        default:
            searchVideos();
            break;
    }
}

//