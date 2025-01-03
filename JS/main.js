
var searchType = 2;
var page = 1;
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const searchButton = document.getElementById('search');
const nextButton = document.getElementById("next");
const prevButton = document.getElementById('previous');
const categorySelect = document.getElementById('category');
const searchInput = document.getElementById('searchInput');
const durationSelect = document.getElementById('duration');
const sectionSelect = document.getElementById('section');
let header = document.getElementById("header");
let pageIndex = document.getElementById("page");
var hoverInterval;
var loading = false;

categorySelect.addEventListener("change", resetPage);
durationSelect.addEventListener("change", resetPage);
sectionSelect.addEventListener("change", resetPage);

if (searchButton) {
    searchButton.addEventListener("click", search);
}

if (prevButton) {
    prevButton.addEventListener("click", previous);
}

if (nextButton) {
    nextButton.addEventListener("click", next);
}

// Function to switch search filter
function switchInputSelect(num) {
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
function search() {
    loading = false;
    load();
    updatePage();
    if (page == 1) {
        header.innerHTML = "Latest Releases";
        prevButton.className = "btn btn-outline-warning disabled";
    } else {
        prevButton.className = "btn btn-outline-warning";
        nextButton.className = "btn btn-outline-warning";
    }
    switch (searchType) {
        case 1:
            searchType = 1;
            console.log("Searching by category");
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
            console.log("Searching by Keyword");
            let key_word = document.getElementById("searchInput").value;
            console.log(key_word);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&lq=1&format=json&order=latest&per_page=30&query=" + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { printCards(result) })
                .catch(error => console.log('Error:', error));
            header.innerHTML = "Search for <span id='search'>" + key_word + "</span>";
            break;
        case 3:
            console.log("Searching by Duration");
            header.innerHTML = "";
            let time = document.getElementById("duration").value;
            if (time == "longest") {
                header.innerHTML = "Searching for <span id='search'>Long Videos</span>";
            } else {
                header.innerHTML = "Searching for <span id='search'>Short Videos</span>";
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
            console.log("Searching by Section");
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

// Function to print the cards
function printCards(result) {
    console.log(result);
    let videoArray = result.videos;
    let videoCards = document.getElementById('video');

    videoCards.innerHTML = "";
    nextButton.className = "btn btn-outline-warning";
    if (videoArray.length == 0) {
        header.innerHTML = "No results found";
        nextButton.className = "btn btn-outline-warning disabled";
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
            changeImageOnHover(this, videoArray[index].thumbs[0].src);
        };
        card.onmouseleave = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, printTitle(videoArray[index].title, 65));
        };
        card.ontouchstart = function () {
            clearInterval(hoverInterval);
            changeImageOnHover(this, videoArray[index].thumbs[0].src);
        };
        card.ontouchend = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, printTitle(videoArray[index].title, 65));
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
        header.innerHTML = "Latest Releases";
        prevButton.className = "btn btn-outline-warning disabled";
    } else {
        prevButton.className = "btn btn-outline-warning";
        nextButton.className = "btn btn-outline-warning";
    }
    updatePage();
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
    updatePage();
}

// Function to create the trending page when loading the trending page
function createTrending() {
    loading = false;
    load();
    window.scrollTo(top);
    updatePage();
    if (page == 1) {
        header.innerHTML = ` <h1 id="header"><span><img src="./img/campfire.png" alt="" id="icon"></span>Trending<span><img
        src="./img/campfire.png" alt="" id="icon"></span></h1>`;
        prevButton.className = "btn btn-outline-warning disabled";
    } else {
        prevButton.className = "btn btn-outline-warning";
        nextButton.className = "btn btn-outline-warning";
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

// Function to print the video title limiting the characters
function printTitle(text, maxWords) {
    let words = text.split('');
    let wordsToPrint = words.slice(0, maxWords).join('');
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
            search();
            break;
    }
}

// Function to go to the previous page
function previous() {
    window.scrollTo(top);
    header.innerHTML = "";
    if (page > 1 && page < 100) {
        page--;
    } else {
        page = 1;
    }
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

// Function to make the Enter key work in the category select
categorySelect.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

durationSelect.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

// Function to make the Enter key work in the section select
sectionSelect.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

// Function to change the image of the card when the mouse enters the card
function changeImageOnHover(cardElement, thumbBase) {
    let i = 2;
    let prev = 1;
    let url;
    start = thumbBase;
    cardElement.querySelector('img').src = thumbBase;
    cardElement.querySelector('h2').textContent = "";
    cardElement.querySelector('p').classList.add("visually-hidden");
    hoverInterval = setInterval(() => {
        cardElement.querySelector('img').src = thumbBase;
        url = thumbBase.replace(prev + "_", i + "_");
        thumbBase = url;
        if (i == 15 || prev == 14) {
            i = 2;
            prev = 1;
            thumbBase = start;
            cardElement.querySelector('img').src = thumbBase;
        } else {
            cardElement.querySelector('img').src = thumbBase.replace(prev + "_", i + "_");
            i++;
            prev++;
        }
    }, 350);
}

// Function to set the default image of the card when the mouse leaves the card
function setDefaultImage(card, thumb, title) {
    card.querySelector('img').src = thumb;
    card.querySelector('h2').textContent = title;
    card.querySelector('p').classList.remove("visually-hidden");
}

// Function to update the page number
function updatePage() {
    pageIndex.textContent = page;
}

// Function to show the loading indicator
function load() {
    let videoGrid = document.getElementById('cardGraphics');
    let loadingDiv = document.getElementById("loading");
    if (loading == true) {
        loadingDiv.className = "container-fluid visually-hidden";
        videoGrid.className = "container-fluid";
    } else {
        loadingDiv.className = "container-fluid";
        videoGrid.className = "container-fluid visually-hidden";
    }
}

// Function to reset the page
function resetPage() {
    page = 1;
}
