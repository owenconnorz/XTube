
var tipoRicerca = 2; // Default search by keyword
var pagina = 1; // Default page
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('cerca');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategoria = document.getElementById('categoria');
const search = document.getElementById('ricerca');
const selectDurata = document.getElementById('durata');
const selectSezione = document.getElementById('sezione');
let intestazione = document.getElementById("intestazione");
let indicePagina = document.getElementById("pagina");
var hoverInterval;
var loading = false;

selectCategoria.addEventListener("change", resetPagina);
selectDurata.addEventListener("change", resetPagina);
selectSezione.addEventListener("change", resetPagina);

if (btn) {
    btn.addEventListener("click", Ricerca);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}

// Switch input select based on filter selected
function SwitchInputSelect(num) {
    switch (num) {
        case 1: // Category filter
            tipoRicerca = 1;
            pagina = 1;
            selectCategoria.className = "form-select";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        case 2: // Keyword filter (Default)
            tipoRicerca = 2;
            pagina = 1;
            selectCategoria.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSezione.className = "form-select visually-hidden";
            search.placeholder = "Cerca";
            selectDurata.className = "form-select visually-hidden";
            break;
        case 3: // Duration filter
            tipoRicerca = 3;
            pagina = 1;
            selectCategoria.className = "form-select visually-hidden";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select";
            break;
        case 4: // Section filter
            tipoRicerca = 4;
            pagina = 1;
            selectSezione.className = "form-select";
            search.className = "form-control me-2 visually-hidden";
            selectCategoria.className = "form-select visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        default:
            tipoRicerca = 2;
            break;
    }
}

// Perform search based on selected filter
function Ricerca() {
    loading = false;
    load();
    cambiaPagina();
    if (pagina == 1) {
        intestazione.innerHTML = "Latest Releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }

    let queryUrl = ""; // Default empty URL to set based on search type

    switch (tipoRicerca) {
        case 1: // Category Search
            let categoria = document.getElementById("categoria").value;
            intestazione.innerHTML = "";
            queryUrl = `https://www.eporner.com/api/v2/video/search/?page=${pagina}&lq=1&format=json&per_page=30&query=${categoria}`;
            break;
        case 2: // Keyword Search
            let key_word = document.getElementById("ricerca").value;
            intestazione.innerHTML = `Ricerca per <span id='ricerca'>${key_word}</span>`;
            queryUrl = `https://www.eporner.com/api/v2/video/search/?page=${pagina}&lq=1&format=json&order=latest&per_page=30&query=${key_word}`;
            break;
        case 3: // Duration Search
            let time = document.getElementById("durata").value;
            intestazione.innerHTML = time == "longest" ? "Ricerca per <span id='ricerca'>Video lunghi</span>" : "Ricerca per <span id='ricerca'>Video Corti</span>";
            queryUrl = `https://www.eporner.com/api/v2/video/search/?page=${pagina}&order=${time}&lq=0&format=json&per_page=30`;
            break;
        case 4: // Section Search (Gay or Hetero)
            let sezione = document.getElementById("sezione").value;
            intestazione.innerHTML = "";
            queryUrl = sezione == "etero"
                ? `https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=${pagina}`
                : sezione == "gay"
                ? `https://www.eporner.com/api/v2/video/search/?page=${pagina}&per_page=30&format=json&lq=1&gay=2`
                : `https://www.eporner.com/api/v2/video/search/?page=${pagina}&per_page=30&format=json&lq=1&query=${sezione}`;
            break;
        default:
            break;
    }

    // Execute fetch request
    fetch(queryUrl, {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => { 
        stampaCards(result);
    })
    .catch(error => console.log('Error:', error));
}

// Function to print cards with video results
function stampaCards(result) {
    console.log(result);
    let arrayVideo = result.videos;
    let cardsVideo = document.getElementById('video');
    cardsVideo.innerHTML = "";
    btnNext.className = "btn btn-outline-warning";
    if (arrayVideo.length == 0) {
        intestazione.innerHTML = "Nessun risultato trovato";
        btnNext.className = "btn btn-outline-warning disabled";
        return;
    }
    
    arrayVideo.forEach((video, index) => {
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
            CambiaImmagineOnHover(this, arrayVideo[index].thumbs[0].src);
        };
        card.onmouseleave = function () {
            clearInterval(hoverInterval);
            setImmagineDefault(this, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 65));
        };
        card.ontouchstart = function () {
            clearInterval(hoverInterval);
            CambiaImmagineOnHover(this, arrayVideo[index].thumbs[0].src);
        };
        card.ontouchend = function () {
            clearInterval(hoverInterval);
            setImmagineDefault(this, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 65));
        };

        const cardDescription = document.createElement(`div`);
        cardDescription.className = `card-description`;

        const h2 = document.createElement(`h2`);
        h2.className = `card-title`;
        h2.textContent = stampaTitolo(arrayVideo[index].title, 60);

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

// Load function to handle the loading state
function load() {
    let gridVideo = document.getElementById('graficaCards');
    let Divloading = document.getElementBy