const clientId='';
const clientSecret='';

const getToken = async () => {

    const response = await fetch('https://accounts.spotify.com/api/token', {
    
        method: 'POST',
    
        headers: {
    
            'Content-Type': 'application/x-www-form-urlencoded',
    
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
         },
    
        body: 'grant_type=client_credentials',
    
    });
    
    const data = await response.json();
    
    return data.access_token;
    
    };
    
const searchSong = async (query, token) => {
    
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    
        method: 'GET',
    
        headers: { 'Authorization': `Bearer ${token} `}
    
    });
    
    
    
    const data = await response.json();
    
    return data.tracks.items;
    
    };
    
const displayResults = async () => {
    
    const query = document.getElementById('searchInput').value;
    
    if (!query) return;
    const token = await getToken();
    const songs = await searchSong(query, token);
    let output = '';
    
    songs.forEach(song => {
    
        output += `
    
            <div class="song-card">
    
                <img src="${song.album.images[0].url}" alt="Album Cover">
    
                <h3>${song.name}</h3>
    
                <p><strong>Artist:</strong> ${song.artists[0].name}</p>
    
                <p><strong>Album:</strong> ${song.album.name}</p>
    
                <audio controls>
    
                    <source src="${song.preview_url}" type="audio/mpeg">
    
                    Your browser does not support the audio element.
    
                </audio>
    
            </div>
    
        `;
    
    });
    
    
    
document.getElementById('results').innerHTML = output;
};
    
document.getElementById('searchBtn').addEventListener('click', displayResults);
