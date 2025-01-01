
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoCategoryId=CATEGORY_ID&key=YOUR_API_KEY`)
  .then(response => response.json())
  .then(data => {
    console.log(data.items); // Process video data
  });
