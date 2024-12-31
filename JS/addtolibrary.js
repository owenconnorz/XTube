
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
