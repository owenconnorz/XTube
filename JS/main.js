
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XTube</title>
    <link rel="icon" type="image/png" href="./img/no-minors.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="./style/stylesheet.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

        body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            background: #f7f0e9;
            transition: .6s;
        }

        h1 {
            font-size: 5em;
            color: #3d3935;
        }

        .video {
            width: 100%;
            height: auto;
            background-color: #ccc;
            position: relative;
            cursor: pointer;
            text-align: center;
            padding: 10px;
            margin-bottom: 20px; /* Space between videos */
        }

        .add-to-library-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            padding: 5px;
            cursor: pointer;
            display: none; /* Initially hidden */
        }

        .video:hover .add-to-library-icon {
            display: block; /* Show on hover */
        }

        .dark-mode {
            background: #0b0a14;
        }

        .dark-mode h1 {
            color: #FFFFFF;
        }

        #loading {
            display: flex;
            justify-content: center;
            margin-top: 4%;
        }

        .spinner-border {
            color: rgb(0, 136, 255) !important;
            width: 3rem;
            height: 3rem;
            margin-bottom: 70%;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-md bg-body-tertiary bg-dark sticky-top" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" id="titolo" href="./index.html">X <span id="logo">Tube</span></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./addtolibrary.html">Library</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./best.html">Trending</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <h1 id="intestazione">Latest Releases</h1>

    <div class="container-fluid" id="loading">
        <div class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    <div class="container-fluid visually-hidden" id="graficaCards">
        <div class="row row-cols-1 row-cols-sm-3 row-gap-5" id="video">
            <!-• Video cards will be dynamically inserted here -->
        </div>
    </div>

    <footer>
        <nav aria-label="Page navigation fixed-bottom" id="pagination" data-bs-theme="dark">
            <ul class="pagination">
                <button type="button" class="btn btn-outline-warning outline-warning" id="previous">&laquo;</button>
                <li class="page-item">Page <span id="pagina">1</span></li>
                <button type="button" class="btn btn-outline-warning" id="next">&raquo;</button>
            </ul>
        </nav>
        <br>
    </footer>

    <div class="modal fade" id="addToLibraryModal" tabindex="-1" aria-labelledby="addToLibraryModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addToLibraryModalLabel">Add to Library</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addToVideoLibraryForm">
                        <div class="mb-3">
                            <label for="videoTitle" class="form-label">Title</label>
                            <input type="text" class="form-control" id="videoTitle" required>
                        </div>
                        <div class="mb-3">
                            <label for="videoUrl" class="form-label">Video URL</label>
                            <input type="url" class="form-control" id="videoUrl" required>
                        </div>
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration (in minutes)</label>
                            <input type="number" class="form-control" id="duration" required>
                        </div>
                        <div class="mb-3">
                            <label for="videoDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="videoDescription" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-outline-warning">Add to Video Library</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>
    <script>
        var searchType = 2;
        var page = 1;
        var loading = false;
        let holdTimer;

        // Event Listeners for Buttons
        document.getElementById('cerca').addEventListener('click', searchFunction);
        document.getElementById('next').addEventListener('click', next);
        document.getElementById('previous').addEventListener('click', prev);

        // Function that performs the search based on the selected filter
        function searchFunction() {
            // Initialize loading
            loading = false;
            load();

            // Determine the search type and fetch data accordingly
            console.log("Performing search...");

            // Simulate fetching video data
            setTimeout(() => {
                // Fake video data for demonstration
                const fakeVideos = [
                    { title: "Video Title 1", default_thumb: { src: "https://via.placeholder.com/150" }, views: "1000", length_min: "5" },
                    { title: "Video Title 2", default_thumb: { src: "https://via.placeholder.com/150" }, views: "2000", length_min: "10" }
                ];
                printCards(fakeVideos);
            }, 1000);
        }

        // Function to print the video cards
        function printCards(videoArray) {
            let cardsVideo = document.getElementById('video');
            cardsVideo.innerHTML = "";

            videoArray.forEach((video, index) => {
                const wrapper = document.createElement(`div`);
                wrapper.className = `col`;

                const card = document.createElement(`div`);
                card.className = `video`;
                card.onmousedown = (event) => startHold(event, video.title);
                card.onmouseup = stopHold;
                card.onmouseleave = stopHold;

                const cardImg = document.createElement(`img`);
                cardImg.src = video.default_thumb.src;
                cardImg.className = `card-img-top`;

                const cardDescription = document.createElement(`div`);
                cardDescription.className = `card-description`;

                const h2 = document.createElement(`h2`);
                h2.className = `card-title`;
                h2.textContent = video.title;

                const p = document.createElement(`p`);
                p.className = `card-text`;
                p.textContent = `Views: ${video.views} | Duration: ${video.length_min} min`;

                // Add the icon
                const icon = document.createElement('i');
                icon.className = "fas fa-plus-circle add-to-library-icon";
                icon.onclick = () => openAddToLibraryModal(video.title);
                
                // Append elements
                cardDescription.append(h2, p);
                card.append(cardImg, cardDescription, icon);
                wrapper.append(card);
                cardsVideo.append(wrapper);
            });

            loading = true;
            load(); // Call load function to update UI
        }

        function startHold(event, title) {
            console.log("Hold started on:", title);
            holdTimer = setTimeout(() => {
                openAddToLibraryModal(title);
            }, 600);
        }

        function stopHold() {
            console.log("Hold stopped");
            clearTimeout(holdTimer);
        }

        function openAddToLibraryModal(title) {
            document.getElementById('videoTitle').value = title; // Set the title in the modal
            var modal = new bootstrap.Modal(document.getElementById('addToLibraryModal'));
            modal.show();
        }

        function load() {
            const loadingDiv = document.getElementById("loading");
            const cardsDiv = document.getElementById("graficaCards");
            if (loading) {
                loadingDiv.classList.add("visually-hidden");
                cardsDiv.classList.remove("visually-hidden");
            } else {
                loadingDiv.classList.remove("visually-hidden");
                cardsDiv.classList.add("visually-hidden");
            }
        }

        function next() {
            console.log("Next page");
            page++;
            searchFunction(); // Re-fetch data for the next page
        }

        function prev() {
            console.log("Previous page");
            if (page > 1) {
                page--;
                searchFunction(); // Re-fetch data for the previous page
            }
        }
    </script>
</body>

</html>
