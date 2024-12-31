
<!-• Modal -->
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

<script>
    let holdTimer;

    function changeMode() {
        var element = document.body;
        element.classList.toggle("dark-mode");
    }

    function startHold(event, title) {
        holdTimer = setTimeout(() => {
            openAddToLibraryModal(title);
        }, 600); // Open modal after 600ms hold
    }

    function stopHold() {
        clearTimeout(holdTimer); // Clear the timer if mouse is released
    }

    function openAddToLibraryModal(title) {
        document.getElementById('videoTitle').value = title; // Set the title in the modal
        var modal = new bootstrap.Modal(document.getElementById('addToLibraryModal'));
        modal.show();
    }

    document.getElementById('addToVideoLibraryForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('videoTitle').value;
        const url = document.getElementById('videoUrl').value;
        const duration = document.getElementById('duration').value;
        const description = document.getElementById('videoDescription').value;

        console.log('Added to Video Library:', { title, url, duration, description });
        alert(title + " has been added to your library!");

        // Reset the form and close the modal
        event.target.reset();
        var modal = bootstrap.Modal.getInstance(document.getElementById('addToLibraryModal'));
        modal.hide();
    });

    // Ensure CreaHome function is defined somewhere in your code
    CreaHome();
</script>
