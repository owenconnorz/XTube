
var searchType = 2;
var page = 1;
var api_url_getall = i_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('near');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategorie = document.getElementById('categorie');
const search = document.getElementById('search');
const selectDuration = document.getElementById('duration');
const selectSection = document.getElementById('select'); // Fixed missing quote
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

// Switch input select function
function SwitchInputSelect(num) {
 switch (num) {
 case 1:
 searchType = 1;
 page = 1;
 selectCategorie.className = "form-select";
 selectSection.className = "form-select visually-hidden";
 search.className = "form-control me-2 visually-hidden";
 selectDuration.className = "form-select visually-hidden";
 break;
 case 2:
 searchType = 2;
 page = 1;
 selectCategorie.className = "form-select visually-hidden";
 search.className = "form-control me-2";
 search.placeholder = "Near";
 selectSection.className = "form-select visually-hidden";
 selectDuration.className = "form-select visually-hidden";
 break;
 case 3:
 searchType = 3;
 page = 1;
 selectCategorie.className = "form-select visually-hidden";
 selectSection.className = "form-select visually-hidden";
 search.className = "form-control me-2 visually-hidden";
 selectDuration.className = "form-select";
 break;
 case 4:
 searchType = 4;
 page = 1;
 selectSection.className = "form-select";
 search.className = "form-control me-2 visually-hidden";
 selectCategorie.className = "form-select visually-hidden";
 selectDuration.className = "form-select visually-hidden";
 break;
 default:
 searchType = 2;
 break;
 }
}

// Search function
function Search() {
 loading = false;
 load();
 changePage();
 if (page === 1) {
 intestazione.innerHTML = "Last uscite";
 btnPrev.className = "btn btn-outline-warning disabled";
 } else {
 btnPrev.className = "btn btn-outline-warning";
 btnNext.className = "btn btn-outline-warning";
 }
 switch (searchType) {
 case 1:
 console.log("search by categorie");
 let categorie = Search function
function Search() {
 loading = false;
 load();
 changePage();
 if (page === 1) {
 intestazione.innerHTML = "Last uscite";
 btnPrev.className = "btn btn-outline-warning disabled";
 } else {
 btnPrev.className = "btn btn-outline-warning";
 btnNext.className = "btn btn-outline-warning";
 }
 switch (searchType) {
 case 1:
 console.log("search by categorie");
 let categorie = selectCategorie.value;
 intestazione.innerHTML = "";
 fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&lq=1&format=json&per_page=30&query=${categorie}`, {
 method: "GET",
 headers: {
 Accept: "application/json"
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 intestazione.innerHTML = `Page <span id="categorie">${page}</span>`;
 break;
 case 2:
 console.log("Search by Keyword");
 let key_word = search.value;
 fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&lq=1&format=json&order=latest&per_page=30&query=${key_word}`, {
 method: "GET",
 headers: {
 Accept: "application/json"
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 intestazione.innerHTML = `Search by <span id='search'>${key_word}</span>`;
 break;
 case 3:
 console.log("Search by Duration");
 let time = selectDuration.value;
 intestazione.innerHTML = time === "longest" ? "Search by <span id='search'>Video hen(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 intestazione.innerHTML = `Search by <span id='search'>${key_word}</span>`;
 break;
 case 3:
 console.log("Search by Duration");
 let time = selectDuration.value;
 intestazione.innerHTML = time === "longest" ? "Search by <span id='search'>Video lunghi</span>" : "Search by <span id='search'>Video Corti</span>";
 fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&order=${time}&lq=0&format=json&per_page=30`, {
 method: "GET",
 headers: {
 Accept: "application/json"
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 break;

 case 4:
 console.log("Search by Section");
 let section = selectSection.value;
 if (section === "etero") {
 fetch(`https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=${page}`, {
 method: "GET",
 headers: {
 Accept: "application/json",
 }
 hing data.";
 });
 break;

 case 4:
 console.log("Search by Section");
 let section = selectSection.value;
 if (section === "etero") {
 fetch(`https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=${page}`, {
 method: "GET",
 headers: {
 Accept: "application/json",
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 } else if (section === "gay") {
 fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&per_page=30&format=json&lq=1&gay=2`, {
 method: "GET",
 headers: {
 Accept: "application/json",
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 } else {
 fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&per_page=30&format=json&lq=1&query=${section}`, {
 method: "GET",
 headers: {
 Accept: "application/json",
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 }
 break;
 default:
 search.value = "";
 break;
 }
}

// Function to print cards
function stampaCards(result) {
 console.log(result);
 let arrayVideo = result.videos;
 let cardsVideo = {
 fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&per_page=30&format=json&lq=1&query=${section}`, {
 method: "GET",
 headers: {
 Accept: "application/json",
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
 }
 break;
 default:
 search.value = "";
 break;
 }
}

// Function to print cards
function stampaCards(result) {
 console.log(result);
 let arrayVideo = result.videos;
 let cardsVideo = document.getElementById('video');

 cardsVideo.innerHTML = "";
 btnNext.className = "btn btn-outline-warning";
 if (arrayVideo.length === 0) {
 intestazione.innerHTML = "Nessun risultato trovato";
 btnNext.className = "btn btn-outline-warning disabled";
 return;
 }

 // Print cards
 arrayVideo.forEach((video, index) => {
 const wrapper = document.createElement(`div`);
 wrapper.className = `col`;
 const card = document.createElement(`div`);
 card.className = `card`;
 card.addEventListener(`click`, () => window.open(video.embed));

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

 const cardDescription = document.createElement(`div`);
 cardDescription.className = `card-description`;

 const h2 = document.createElement(`h2`);
 h2.className = Interval);
 CambiaImmagineOnHover(this, arrayVideo[index].thumbs[0].src);
 };
 card.onmouseleave = function () {
 clearInterval(hoverInterval);
 setImmagineDefault(this, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 65));
 };

 const cardDescription = document.createElement(`div`);
 cardDescription.className = `card-description`;

 const h2 = document.createElement(`h2`);
 h2.className = `card-title`;
 h2.textContent = stampaTitolo(arrayVideo[index].title, 60);

 const p = document.createElement(`p`);
 p.className = `card-text`;

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

 spanViews.textContent = video.views;
 spanTime.textContent = video.length_min;

 // Append elements
 p.append(spanViews, spanTime);
 cardDescription.append(h2, p);
 card.append(cardImg, cardDescription);
 wrapper.append(card);
 cardsVideo.append(wrapper);
 });

 loading = true;
 setTimeout(load, 800);
}

// Home function
function Home() {
 window.scrollTo(0, 0);
 loading = false;
 load();
 if (page === 1) {
 intestazione.innerHTML wrapper.append(card);
 cardsVideo.append(wrapper);
 });

 loading = true;
 setTimeout(load, 800);
}

// Home function
function Home() {
 window.scrollTo(0, 0);
 loading = false;
 load();
 if (page === 1) {
 intestazione.innerHTML = "Latest releases";
 btnPrev.className = "btn btn-outline-warning disabled";
 } else {
 btnPrev.className = "btn btn-outline-warning";
 btnNext.className = "btn btn-outline-warning";
 }
 changePage();
 fetch(`https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=${page}&per_page=30`, {
 method: "GET",
 headers: {
 Accept: "application/json"
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
}

// Trending function
function CreaTrending() {
 loading = false;
 load();
 window.scrollTo(0, 0);
 if (page === 1) {
 intestazione.innerHTML = `<h1 id="intestazione"><span><img src="./img/campfire.png" alt="" id="icone"></span>Trending<span><img src="./img/campfire.png" alt="" id="icone"></span></h1>`;
 btnPrev.className = "btn btn-outline-warning disabled";
 } else {
 btnPrev.className = "btn btn-outline-warning";
 btnNext.className = "btn btn-outline-warning";
 /span></h1>`;
 btnPrev.className = "btn btn-outline-warning disabled";
 } else {
 btnPrev.className = "btn btn-outline-warning";
 btnNext.className = "btn btn-outline-warning";
 }
 fetch(`https://www.eporner.com/api/v2/video/search/?page=${page}&order=top-weekly&lq=0&format=json&per_page=30`, {
 method: "GET",
 headers: {
 Accept: "application/json"
 }
 })
 .then(response => response.json())
 .then(result => { stampaCards(result); })
 .catch(error => {
 console.log('Error:', error);
 intestazione.innerHTML = "Error fetching data.";
 });
}

// Function to limit video title characters
function stampaTitolo(testo, numeroParole) {
 let parole = testo.split('');
 let paroleDaStampare