let accessToken;

// URL setup
const redirect_uri = '&redirect_uri=http://localhost:3000/'
const client_id = '&client_id=b3572cb44b614c32b3f02bd25673dff0';
const base = 'https://accounts.spotify.com/authorize';
const response_type = '?response_type=token';

const endpoint = base + response_type + client_id + redirect_uri
export const Spotify = {
    getAccessToken(){
        if(accessToken) {
            return accessToken
        }

        const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/)
        const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenCheck && expiresInCheck) {
            accessToken = accessTokenCheck[1];
            const expiresIn = Number(expiresInCheck[1]);

        // This will allow new access token when previous one expires

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('accessToken', null, '/');
            
            return accessToken;
        } else {
            window.location = endpoint;
        }
    }

}


