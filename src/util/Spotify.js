let accessToken;

// URL setup
const base = "https://accounts.spotify.com/authorize";
const response_type = "token";
const scope = "playlist-modify-public";
const redirect_uri = "http://localhost:3000/";
const client_id = "b3572cb44b614c32b3f02bd25673dff0";

let endpoint = base;
endpoint += `?response_type=${response_type}`;
endpoint += `&client_id=${client_id}`;
endpoint += `&scope=${scope}`;
endpoint += `&redirect_uri=${redirect_uri}`;

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

  async request(url, args) {
    try {
      const response = await fetch(url, args);

      if (response.ok) {
        return response.json();
      }
    } catch (e) {
      console.error(e.message);
    }
  },

  async search(searchTerm) {
    const foundTracks = await this.request(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
      }
    );

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
  },

  async savePlaylist(name, trackURIs) {
    const apiEndpoint = "https://api.spotify.com/v1/";

    if (!name && !trackURIs) {
      console.log(`No name or Track URI's were found`);
      return;
    }
    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // fetch User ID
    const user = await this.request(`${apiEndpoint} + me`, {
      headers: headers,
    });

    // create a new playlist
    const playlist = await this.request(`${apiEndpoint}users/${user.id}/playlists`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ name: name }),
    });

    console.log(playlist);
  },
};
