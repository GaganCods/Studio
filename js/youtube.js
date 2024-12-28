const YOUTUBE_API_KEY = 'AIzaSyBRAgCazVFys175YZw25Cjnk-olTgf9MRU';
const CHANNEL_ID = 'UCE8vEugOiXyDXlnImH41ovw';
const MAX_RESULTS = 6;

async function loadYouTubeVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`);
        const data = await response.json();
        
        const youtubeGrid = document.getElementById('youtube-grid');
        youtubeGrid.innerHTML = ''; // Clear loading spinner

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    title="YouTube video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            youtubeGrid.appendChild(videoCard);
        });
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        document.getElementById('youtube-grid').innerHTML = '<p class="error">Failed to load videos. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadYouTubeVideos);