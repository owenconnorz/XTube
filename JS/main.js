
var searchType = 2;
var page = 1;
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('near');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategorie = document.getElementById('categorie');
const search = document.getElementById('search');
const selectDuration = document.getElementById('duration');
const selectSection = document.getElementById('select);
let intestazione = document.getElementById("header");
let indexPage = document.getElementById("page");
var hoverInterval;
var loading = false;

selectCategorie.addEventListener("change", resetPage);
selectDuration.addEventListener("change", resetPage);
selectSection.addEventListener("change", resetPage);

if (btn) {
    btn.addEventListener("click", Search);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}
// funzione che mi fa cambiare il filtro di ricerca
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            //Filter Categorie
            searchType = 1;
            page = 1
            selectCategorie.className = "form-select";
            selectSection.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDuration.className = "form-select visually-hidden";
            break;
        case 2:
            //Filtro Parola Chiave (Default)
            searchType = 2;
            page = 1
            selectCategorie.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSection.className = "form-select visually-hidden";
            search.placeholder = "Near";
            selectDuration.className = "form-select visually-hidden";
            break;

        case 3:
            //Filter Duration
            searchType = 3;
            page = 1
            selectCategorie.className = "form-select visually-hidden";
            selectSection.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDuration.className = "form-select";
            break;
        case 4:
            //Filer Section
            page = 1
            searchType = 4;
            
            selectSection.className = "form-select";
            search.className = "form-control me-2 visually-hidden";
            selectCategoria.className = "form-select visually-hidden";
            selectDuration.className = "form-select visually-hidden";
            break;
        default:
            searchType = 2;
            break;

    }
}
// funzione che mi fa la ricerca in base al filtro selezionato
function Search() {
    loading = false;
    load();
    changePage();
    if (page == 1) {
        intestazione.innerHTML = "Last uscite";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    switch (searchType) {
        case 1:
            searchType = 1;
            console.log("search by categorie");
            let categorie = document.getElementById("categorie").value;
            intestazione.innerHTML = "";
            console.log(categorie);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&lq=1&format=json&per_page=30&query=" + categorie, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            intestazione.innerHTML = `Page <span id="categorie">${page}</span>`;
            break;
        case 2:
            searchType = 2;
            intestazione.innerHTML = "";
            console.log("Search by Keyword");
            let key_word = document.getElementById("search").value;
            console.log(key_word);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&lq=1&format=json&order=latest&per_page=30&query=" + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            intestazione.innerHTML = "Search by<span id='search'>" + key_word + "</span>";
            break;
        case 3:
            console.log("Search by Duration");
            intestazione.innerHTML = "";
            let time = document.getElementById("duration").value;
            if (time == "longest") {
                intestazione.innerHTML = "Search by <span id='search'>Video lunghi</span>";
            } else {
                intestazione.innerHTML = "Search by <span id='search'>Video Corti</span>";
            }

            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&order=" + time + "&lq=0&format=json&per_page=30", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            break;

        case 4:
            console.log("Search by Section");
            header.innerHTML = "";
            let section = document.getElementById("section").value;
            console.log(section);
            if (section == "etero") {
                fetch("https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=" + page, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));

            } else if (section == "gay") {
    
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&gay=2", {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));
            } else {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&query=" + section, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));
            }
            break;
        default:
            document.getElementById("search").value = "";
            break;
    }
}
// funzione che mi stampa le cards
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
    // stampa delle cards
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
            ChangeImmagineOnHover(this, arrayVideo[index].thumbs[0].src)
        };
        card.onmouseleave = function () {
            clearInterval(hoverInterval);
            setImmagineDefault(this, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 65))
        };
        card.ontouchstart = function () {
            clearInterval(hoverInterval)
            CambiaImmagineOnHover(this, arrayVideo[index].thumbs[0].src)
        };
        card.ontouchend = function () {
            clearInterval(hoverInterval);
            setImmagineDefault(this, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 65))
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

        const spanViewsText = document.createElement(`eng`);
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
// funzione che mi crea la homepage quando carica la page index
function Home() {
    window.scrollTo(top);
    loading = false;
    load();
    if (page == 1) {
        intestazione.innerHTML = "Latest releases";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    changePage();
    console.log("Home");
    tipoRicerca = 5;
    fetch("https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=" + page + "&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
    changePage();
}
// funzione che mi crea la pagina trending quando carica la pagina trending
function CreaTrending() {
    loading = false;
    load();
    window.scrollTo(top);
    changePage();
    if (page == 1) {
        intestazione.innerHTML = ` <h1 id="intestazione"><span><img src="./img/campfire.png" alt="" id="icone"></span>Trending<span><img
        src="./img/campfire.png" alt="" id="icone"></span></h1>`;
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    console.log("Trending");
    searchType = 6;
    fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&order=top-weekly&lq=0&format=json&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
}
//funzione che mi stampa il titolo del video limitando i caratteri
function stampaTitolo(testo, numeroParole) {
    let parole = testo.split('');
    let paroleDaStampare = parole.slice(0, numeroParole).join('');
    return paroleDaStampare;
}
// funzione che mi fa andare alla pagina successiva
function next() {
    window.scrollTo(top);
    intestazione.innerHTML = "";
    console.log(searchType);
    if (page > 0 && page < 100) {
        page++;
    } else {
        page = 1;
    }
    switch (searchType) {
        case 5:
            Home();
            break;
        case 6:
            Trending();
        default:
            Search();
            break;
    }
}
// funzione che mi fa andare alla pagina precedente
function prev() {
    window.scrollTo(top);
    intestazione.innerHTML = "";
    if (page > 1 && page < 100) {
        pag3--;
    } else {
        page = 1;

    }
    switch (searchType) {
        case 5:
            Home();
            break;
        case 6:
            Trending();
            break;
        default:
            Search();
            break;
    }
}
//Funzione per far funzionare il tasto invio nella select della categorie
categorie.addEventListener("keypress", function (event) {
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
//Funzione per far funzionare il tasto invio nella select della sezione
selectSection.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});
//Funzione per cambiare l'immagine della card quando il mouse entra nella card
function CambiaImmagineOnHover(cardElement, thumbBase) {
    let i = 2;
    let prec = 1;
    let url;
    inizio = thumbBase;
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
//Funzione per cambiare l'immagine della card quando il mouse esce dalla card
function setImmagineDefault(card, thumb, titolo) {
    card.querySelector('img').src = thumb;
    card.querySelector('h2').textContent = titolo;
    card.querySelector('p').classList.remove("visually-hidden");
}
//Funzione per cambiare il numero della page
function changePage() {
    indexPage.textContent = page;
}
// Funzione per far apparire il loading
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
// Funzione per resettare la page
function resetPage(){
    page = 1;
}