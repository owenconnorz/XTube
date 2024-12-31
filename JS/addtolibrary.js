
function startHold(event, title) {
    console.log("Hold started on:", title);
    holdTimer = setTimeout(() => {
        openAddToLibraryModal(title);
    }, 600); // Open modal after 600ms hold
}

function stopHold() {
    console.log("Hold stopped");
    clearTimeout(holdTimer); // Clear the timer if mouse is released
}
