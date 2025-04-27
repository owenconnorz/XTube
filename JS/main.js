// ================= Variables =================
let searchType = 2;
let page = 1;
let loading = false;
let hoverInterval;

const apiBase = "https://www.eporner.com/api/v2/video/search/?format=json&lq=1";

const elements = {
    btnSearch: document.getElementById('search'),
    btnNext: document.getElementById('next'),
    btnPrev: document.getElementById('previous'),
    selectCategory: document.getElementById('category'),
    selectDuration: document.getElementById('duration'),
    selectSection: document.getElementById('section'),
    searchInput: document.getElementById('search-input'),
    header: document.getElementById('header'),
    pageIndex: document.getElementById('page'),
    videoGrid: document.getElementById('video'),
    cardGrid: document.getElementById('cardGrid'),
    loadingDiv: document.getElementById('loading')
};

// ================= Event Listeners =================
['category', 'search-input', 'duration', 'section'].forEach(id => {
    document.getElementById(id).addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            elements.btnSearch.click();
        }
    });
});

elements.selectCategory.addEventListener("change", resetPage);
elements.selectDuration.addEventListener("change", resetPage);
elements.selectSection.addEventListener("change", resetPage);

elements.btnSearch?.addEventListener("click", search);
elements.btnPrev?.addEventListener("click", prev);
elements.btnNext?.addEventListener("click", next);

// ================= Helper Functions =================
const fetchVideos = (url, onSuccess) => {
    fetch(url, { method: "GET", headers: { "Accept": "application/json" } })
        .then(res => res.json())
        .then(onSuccess)
        .catch(error => console.error('Fetch Error:', error));
};

const shortenTitle = (text, maxLength) => text.slice(0, maxLength);

function resetPage() {
    page = 1;
}

function updatePage() {
    elements.pageIndex.textContent = page;
}

function load() {
    const loadingVisible = loading ? 'visually-hidden' : '';
    elements.loadingDiv.className = `container-fluid ${loadingVisible}`;
    elements.cardGrid.className = `container-fluid ${loading ? '' : 'visually-hidden'}`;
}

// ================= Core Functions =================
function SwitchInputSelect(num) {
    searchType = num;
    page = 1;
    
    const toggle = (el, visible) => el.className = visible ? 'form-select' : 'form-select visually-hidden';
    const toggleInput = (el, visible) => el.className = visible ? 'form-control me-2' : 'form-control me-2 visually-hidden';

    toggle(elements.selectCategory, num === 1);
    toggleInput(elements.searchInput, num === 2);
    toggle(elements.selectDuration, num === 3);
    toggle(elements.selectSection, num === 4);

    if (num === 2) elements.searchInput.placeholder = "Search";
}

function search() {
    loading = false;
    load();
    updatePage();
    
    if (page === 1) {
        elements.header.innerHTML = "Latest Releases";
        elements.btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        elements.btnPrev.className = elements.btnNext.className = "btn btn-outline-warning";
    }

    let url = '';
    let query = '';

    switch (searchType) {
        case 1:
            query = elements.selectCategory.value.trim();
            url = `${apiBase}&per_page=30&page=${page}&query=${query}`;
            elements.header.innerHTML = `Category: ${query}`;
            break;
        case 2:
            query = elements.searchInput.value.trim();
            url = `${apiBase}&order=latest&per_page=30&page=${page}&query=${query}`;
            elements.header.innerHTML = `Search: ${query}`;
            break;
        case 3:
            query = elements.selectDuration.value;
            url = `${apiBase}&order=${query}&per_page=30&page=${page}`;
            elements.header.innerHTML = query === "longest" ? "Long Videos" : "Short Videos";
            break;
        case 4:
            query = elements.selectSection.value;
            if (query === "straight") {
                url = `${apiBase}&gay=0&per_page=30&page=${page}`;
            } else if (query === "gay") {
                url = `${apiBase}&gay=2&per_page=30&page=${page}`;
            } else {
                url = `${apiBase}&per_page=30&page=${page}&query=${query}`;
            }
            elements.header.innerHTML = `Section: ${query}`;
            break;
        default:
            return;
    }

    console.log(`Fetching: ${url}`);
    fetchVideos(url, printCards);
}

function next() {
    if (page < 100) page++;
    else page = 1;
    window.scrollTo(0, 0);
    header.innerHTML = "";
    switch (searchType) {
        case 5: createHome(); break;
        case 6: createTrending(); break;
        default: search(); break;
    }
}

function prev() {
    if (page > 1) page--;
    else page = 1;
    window.scrollTo(0, 0);
    header.innerHTML = "";
    switch (searchType) {
        case 5: createHome(); break;
        case 6: createTrending(); break;
        default: search(); break;
    }
}

function createHome() {
    pageSetup("Latest Releases");
    searchType = 5;
    fetchVideos(`${apiBase}&lq=0&per_page=30&page=${page}`, printCards);
}

function createTrending() {
    pageSetup("Trending");
    searchType = 6;
    fetchVideos(`${apiBase}&order=top-weekly&lq=0&per_page=30&page=${page}`, printCards);
}

function pageSetup(title) {
    window.scrollTo(0, 0);
    loading = false;
    load();
    updatePage();
    elements.header.innerHTML = title;
    elements.btnPrev.className = page === 1 ? "btn btn-outline-warning disabled" : "btn btn-outline-warning";
    elements.btnNext.className = "btn btn-outline-warning";
}

// ================= Render Functions =================
function printCards(result) {
    console.log(result);
    const videos = result.videos || [];
    elements.videoGrid.innerHTML = "";

    if (!videos.length) {
        elements.header.innerHTML = "No Results Found";
        elements.btnNext.className = "btn btn-outline-warning disabled";
        return;
    }

    videos.forEach(video => {
        const wrapper = document.createElement('div');
        wrapper.className = 'col';

        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => window.open(video.embed);

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

        p.innerHTML = `
            <span class="card-text" id="n-views"><img src="/img/eye.png" id="views"> ${video.views}</span>
            <span class="card-text" id="time"><img src="/img/clock-circular-outline.png" id="clock"> ${video.length_min}</span>
        `;

        card.append(cardImg, cardDescription);
        cardDescription.append(h2, p);
        wrapper.append(card);
        elements.videoGrid.append(wrapper);

        card.addEventListener('mouseover', () => changeImageOnHover(card, video.thumbs[0].src));
        card.addEventListener('mouseleave', () => setDefaultImage(card, video.default_thumb.src, video.title));
        card.addEventListener('touchstart', () => changeImageOnHover(card, video.thumbs[0].src));
        card.addEventListener('touchend', () => setDefaultImage(card, video.default_thumb.src, video.title));
    });

    loading = true;
    setTimeout(load, 800);
}

// ================= Hover Functions =================
function changeImageOnHover(cardElement, thumbBase) {
    clearInterval(hoverInterval);
    let i = 2;
    hoverInterval = setInterval(() => {
        let url = thumbBase.replace(/(\d+)_/, `${i}_`);
        cardElement.querySelector('img').src = url;
        i = i === 15 ? 2 : i + 1;
    }, 350);
}

function setDefaultImage(card, thumb, title) {
    clearInterval(hoverInterval);
    card.querySelector('img').src = thumb;
    card.querySelector('h2').textContent = shortenTitle(title, 65);
}