// Substitua pelo seu Access Token
const accessToken = 'BQCBSa8NhrhhibQWylCoD_VVY92W8U1HwHysXd_ALxop921_tI4pjuCnXPT97noAD1SAmrPuelXm0-cw9O2FyQP0vA9AjWyejT9eOekF2Acc9YH9qDE';


// Função para buscar a música atual
async function fetchCurrentlyPlaying() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204 || response.status === 401) {
      console.log('Nenhuma música está tocando ou o token expirou.');
      return;
    }

    const data = await response.json();

    if (data && data.item) {
      const songName = data.item.name;
      const artistName = data.item.artists.map((artist) => artist.name).join(', ');
      const albumImage = data.item.album.images[0].url;

      // Atualiza o HTML com os dados da música
      document.querySelector('#album-cover').src = albumImage;
      document.querySelector('#song-title').textContent = songName;
      document.querySelector('#artist-name').textContent = artistName;
    } else {
      console.log('Nenhuma música está tocando no momento.');
    }
  } catch (error) {
    console.error('Erro ao buscar a música atual:', error);
  }
}

// Atualizar automaticamente a cada 30 segundos
setInterval(fetchCurrentlyPlaying, 30000);

// Chamada inicial
fetchCurrentlyPlaying();
