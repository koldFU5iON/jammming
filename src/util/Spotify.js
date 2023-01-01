let accessToken;

// URL setup
const redirect_uri = "&redirect_uri=http://localhost:3000/";
const client_id = "&client_id=b3572cb44b614c32b3f02bd25673dff0";
const scope = '&scope=playlist-modify-private playlist-modify-public'
const base = "https://accounts.spotify.com/authorize";
const response_type = "?response_type=token";

const accessTokenEndpoint = base + response_type + client_id + scope + redirect_uri;

export const Spotify = {
  getAccessToken() {
    console.log(accessTokenEndpoint);
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
      window.location.href = accessTokenEndpoint;
    }
  },

  async search(searchTerm) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {
          headers: { 
            Authorization: `Bearer ${Spotify.getAccessToken()}`
          },
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

  savePlaylist(name, trackURIs) {
    if (!name && !trackURIs) {
      console.log(`No name or Track URI's were found`);
      return;
    }

    const headers = {
      Authorization: `Bearer ${Spotify.getAccessToken()}`,
    };

    // fetch User ID
    const apiAccessTokenEndpoint = "https://api.spotify.com/v1/";

    fetch(apiAccessTokenEndpoint + "me", {
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Unable to fetch User ID");
        }
      })
      .then((user) => {
        // create a new playlist
        const playlistaccessTokenEndpoint = `${apiAccessTokenEndpoint}users/${user.id}/playlists`;
        return fetch(playlistaccessTokenEndpoint, {
          method: "POST",
          headers: headers,
          "Content-Type": "application.json",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("got a response");
              return response.json();
            } else {
              throw new Error("Could not create new playlist");
            }
          })
          .then((playlist) => {
            console.log(playlist);
          });
      });
  },
};
