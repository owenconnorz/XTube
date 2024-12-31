
var searchType = 2; // Translated from 'tipoRicerca'
var page = 1; // Translated from 'pagina'
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('cerca'); // Translated from 'cerca'
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategory = document.getElementById('categoria'); // Translated from 'categoria'
const search = document.getElementById('ricerca'); // Translated from 'ricerca'
const selectDuration = document.getElementById('durata'); // Translated from 'durata'
const selectSection = document.getElementById('sezione'); // Translated from 'sezione'
let header = document.getElementById("intestazione"); // Translated from 'intestazione'
let pageIndex = document.getElementById("pagina"); // Translated from 'pagina'
var hoverInterval;
var loading = false;

selectCategory.addEventListener("change", resetPage); // Translated from 'resetPagina'
selectDuration.addEventListener("change", resetPage); // Translated from 'resetPagina'
selectSection.addEventListener("change", resetPage); // Translated from 'resetPagina'

if (btn) {
    btn.addEventListener("click", searchFunction); // Translated from 'Ricerca'
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}

// Function that changes the search filter
function SwitchInputSelect(num) {
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
            search.placeholder = "Search"; // Translated from 'Cerca'
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

// Function that performs the search based on the selected filter
function searchFunction() {
    loading = false;
    load();
    changePage(); // Translated from 'cambiaPagina'
    if (page == 1) {
        header.innerHTML = "Latest Releases"; // Translated from 'Ultime uscite'
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    switch (searchType) {
        case 1:
            searchType = 1;
            console.log("Search by category"); // Translated from 'Ricerca per categoria'
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
                .then(result => { printCards(result) }) // Translated from 'stampaCards'
                .catch(error => console.log('Error:', error));
            header.innerHTML = `Page <span id="categoria">${page}</span>`; // Translated from 'Pagina'
            break;
        case 2:
            searchType = 2;
            header.innerHTML = "";
            console.log("Search by Keyword"); // Translated from 'Ricerca per Parola Chiave'
            let keyWord = document.getElementById("ricerca").value; // Translated from 'key_word'
            console.log(keyWord);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&lq=1&format=json&order=latest&per_page=30&query=" + keyWord, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { printCards(result) }) // Translated from 'stampaCards'
                .catch(error => console.log('Error:', error));
            header.innerHTML = "Search by <span id='ricerca'>" + keyWord + "</span>"; // Translated from 'Ricerca per Parola Chiave'
            break;
        case 3:
            console.log("Search by Duration"); // Translated from 'Ricerca per Durata'
            header.innerHTML = "";
            let time = document.getElementById("durata").value; // Translated from 'durata'
            if (time == "longest") {
                header.innerHTML = "Search by <span id='ricerca'>Long Videos</span>"; // Translated from 'Video Lunghi'
            } else {
                header.innerHTML = "Search by <span id='ricerca'>Short Videos</span>"; // Translated from 'Video Corti'
            }

            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&order=" + time + "&lq=0&format=json&per_page=30", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { printCards(result) }) // Translated from 'stampaCards'
                .catch(error => console.log('Error:', error));
            break;

        case 4:
            console.log("Search by Section"); // Translated from 'Ricerca per Sezione'
            header.innerHTML = "";
            let section = document.getElementById("sezione").value; // Translated from 'sezione'
            console.log(section);
            if (section == "hetero") { // Translated from 'etero'
                fetch("https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=" + page, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { printCards(result) }) // Translated from 'stampaCards'
                    .catch(error => console.log('Error:', error));

            } else if (section == "gay") {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&gay=2", {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { printCards(result) }) // Translated from 'stampaCards'
                    .catch(error => console.log('Error:', error));
            } else {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&query=" + section, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { printCards(result) }) // Translated from 'stampaCards'
                    .catch(error => console.log('Error:', error));
            }
            break;
        default:
            document.getElementById("ricerca").value = ""; // Translated from 'ricerca'
            break;
    }
}

// Function that prints the cards
function printCards(result) { // Translated from 'stampaCards'
    console.log(result);
    let videoArray = result.videos; // Translated from 'arrayVideo'
    let cardsVideo = document.getElementById('video');

    cardsVideo.innerHTML = "";
    btnNext.className = "btn btn-outline-warning";
    if (videoArray.length == 0) {
        header.innerHTML = "No results found"; // Translated from 'Nessun risultato trovato'
        btnNext.className = "btn btn-outline-warning disabled";
        return;
    }

    // Printing the cards
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
            ChangeImageOnHover(this, videoArray[index].thumbs[0].src); // Translated from 'CambiaImmagineOnHover'
        };
        card.onmouseleave = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, printTitle(videoArray[index].title, 65)); // Translated from 'setImmagineDefault' and 'stampaTitolo'
        };
        card.ontouchstart = function () {
            clearInterval(hoverInterval);
            ChangeImageOnHover(this, videoArray[index].thumbs[0].src);
        };
        card.ontouchend = function () {
            clearInterval(hoverInterval);
            setDefaultImage(this, video.default_thumb.src, printTitle(videoArray[index].title, 65)); // Translated from 'setImmagineDefault' and 'stampaTitolo'
        };

        const cardDescription = document.createElement(`div`);
        cardDescription.className = `card-description`;

        const h2 = document.createElement(`h2`);
        h2.className = `card-title`;
        h2.textContent = printTitle(videoArray[index].title, 60); // Translated from 'stampaTitolo'

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
        cardsVideo.append(wrapper);

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

// Function to create the homepage when the index page loads
function CreaHome() {
    window.scrollTo(top);
    loading = false;
    load();
    if (page == 1) {
        header.innerHTML = "Latest Releases"; // Translated from 'Ultime uscite'
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    changePage(); // Translated from 'cambiaPagina'
    console.log("Create Home");
    searchType = 5;
    fetch("https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=" + page + "&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { printCards(result) }) // Translated from 'stampaCards'
        .catch(error => console.log('Error:', error));
    changePage();
}

// Function to create the trending page when it loads
function CreaTrending() {
    loading = false;
    load();
    window.scrollTo(top);
    changePage(); // Translated from 'cambiaPagina'
    if (page == 1) {
        header.innerHTML = `<h1 id="intestazione"><span><img src="./img/campfire.png" alt="" id="icone"></span>Trending<span><img
        src="./img/campfire.png" alt="" id="icone"></span></h1>`;
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
        .then(result => { printCards(result) }) // Translated from 'stampaCards'
        .catch(error => console.log('Error:', error));
}

// Function to print the video title limiting the characters
function printTitle(text, numberOfWords) { // Translated from 'stampaTitolo'
    let words = text.split('');
    let wordsToPrint = words.slice(0, numberOfWords).join('');
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
            CreaHome();
            break;
        case 6:
            CreaTrending();
            break; // Added break
        default:
            searchFunction(); // Translated from 'Ricerca'
            break;
    }
}

// Function to go to the previous page
function prev() {
    window.scrollTo(top);
    header.innerHTML = "";
    if (page > 1 && page < 100) {
        page--;
    } else {
        page = 1;
    }
    switch (searchType) {
        case 5:
            CreaHome();
            break;
        case 6:
            CreaTrending();
            break;
        default:
            searchFunction(); // Translated from 'Ricerca'
            break;
    }
}

// Function to enable the Enter key in the category select
selectCategory.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

selectDuration.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

// Function to enable the Enter key in the section select
selectSection.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

// Function to change the image of the card when the mouse enters the card
function ChangeImageOnHover(cardElement, thumbBase) { // Translated from 'CambiaImmagineOnHover'
    let i = 2;
    let prec = 1;
    let url;
    start = thumbBase; // Changed 'inizio' to 'start'
    cardElement.querySelector('img').src = thumbBase;
    cardElement.querySelector('h2').textContent = "";
    cardElement.querySelector('p').classList.add("visually-hidden");
    hoverInterval = setInterval(() => {
        cardElement.querySelector('img').src = thumbBase;
        url = thumbBase.replace(prec + "_", i + "_");
        thumbBase = url;
        if (i == 15 || prec == 14) {
            i = 2;
            prec = 1;
            thumbBase = start;
            cardElement.querySelector('img').src = thumbBase;

        } else {
            cardElement.querySelector('img').src = thumbBase.replace(prec + "_", i + "_");
            i++;
            prec++;
        }
    }, 350);
}

// Function to change the image of the card when the mouse leaves the card
function setDefaultImage(card, thumb, title) { // Translated from 'setImmagineDefault'
    card.querySelector('img').src = thumb;
    card.querySelector('h2').textContent = title; // Translated from 'titolo'
    card.querySelector('p').classList.remove("visually-hidden");
}

// Function to change the page number
function changePage() { // Translated from 'cambiaPagina'
    pageIndex.textContent = page; // Translated from 'indicePagina'
}

// Function to show loading
function load() {
    let gridVideo = document.getElementById('graficaCards');
    let Divloading = document.getElementById("loading");
    if (loading == true) {
        Divloading.className = "container-fluid visually-hidden";
        gridVideo.className = "container-fluid";
    } else {
        Divloading.className = "container-fluid";
        gridVideo.className = "container-fluid visually-hidden";
    }
}

// Function to reset the page
function resetPage() { // Translated from 'resetPagina'
    page = 1;
}
