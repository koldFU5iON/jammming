let accessToken;

// URL setup
const redirect_uri = "&redirect_uri=http://localhost:3000/";
const client_id = "&client_id=b3572cb44b614c32b3f02bd25673dff0";
const base = "https://accounts.spotify.com/authorize";
const response_type = "?response_type=token";

const endpoint = base + response_type + client_id + redirect_uri;
export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const access_token = window.location.href.match(/access_token=([^&]*)/);
    const expires_in = window.location.href.match(/expires_in=([^&]*)/);

    if (access_token && expires_in) {
      accessToken = access_token[1];
      const expiresIn = Number(expires_in[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("accessToken", null, "/");

      return accessToken;
    } else {
      window.location.href = endpoint;
    }
  },

  async search(searchTerm) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${this.getAccessToken()}` },
        }
      );

      if (response.ok) {
        const foundTracks = await response.json();
        let tracks = [];
        if (foundTracks.tracks) {
          tracks = foundTracks.tracks.items.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            };
          });
        }
        return tracks;
      }
      throw new Error("There was an error fetching your request");
    } catch (e) {
      console.error(`Full error: ${e}`);
    }
  },

  async savePlaylist(name, trackURIs) {
    if (!name && !trackURIs) {
      console.log(`No name or Track URI's were found`);
      return;
    }
    const accessToken = this.getAccessToken()
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    // fetch User ID
    let userID = "";
    const endpoint = "https://api.spotify.com/v1/me";

    console.log('Fetching User ID')
    let response = await fetch(endpoint, {
      headers: headers,
    });

    if (response.ok) {
        console.log('User ID found!')
      const user = await response.json();
      userID = user.id;
    }

    // create a new playlist
    const playlistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
    console.log(headers)
    response = await fetch(playlistEndpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({name: name})
    });

    if (response.ok) {
      const playlist = await response.json();
      console.log(playlist);
    }
    // throw new Error('Could not create new playlist')
  },
};
