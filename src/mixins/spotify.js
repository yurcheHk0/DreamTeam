import EventBus from '../helpers/event-bus.js';

export default {
    methods: {
        client_id: "b6df99a66f8d4d2485471b56f27bc2ea",
        client_secret: "ddb328d4b9fe438f8354b06d02a4e8a2",

        //TODO: refactor this method after auth will be added functionality
        getCredentials(){
            this.hashParams = JSON.parse(this.$localStorage.get('UserAuthHash'));
            this.SpotifyUserDetails = JSON.parse(this.$localStorage.get('User'));
            this.SpotifyUserDetailsPlaylists = JSON.parse(this.$localStorage.get('SpotifyUserDetails'));
         },

         //Get Current User’s Profile
         //https://developer.spotify.com/web-api/get-current-users-profile/
         getCurrentUserProfile(){
            this.getCredentials();

            return new Promise((resolve, reject) => {
                this.$http.get('https://api.spotify.com/v1/me' , {headers: {'Authorization': this.hashParams.token_type + " " + this.hashParams.access_token}}).then(function(resp){
                    resolve(resp.body);
                }, function(error){
                    this.loginError(error);
                    reject(error);
                });
            });
         },

        //Get a Playlist
        //https://developer.spotify.com/web-api/get-playlist/
        getPlaylist(params) {
            this.getCredentials();

            return new Promise((resolve, reject) => {
                this.$http.get('https://api.spotify.com/v1/users/' + params.user_id + '/playlists/' + params.playlist_id , {headers: {'Authorization': this.hashParams.token_type + " " + this.hashParams.access_token}}).then(function(resp){
                    resolve(resp.body);
                }, function(error){
                    this.loginError(error);
                    reject(error);
                });
            });
        },
        
        //Get a List of Current User's Playlists
        //https://developer.spotify.com/web-api/get-a-list-of-current-users-playlists/
        getListOfCurrentUserPlaylists() {
            this.getCredentials();

            return new Promise((resolve, reject) => {
                this.$http.get('https://api.spotify.com/v1/me/playlists'  , {headers: {'Authorization': this.hashParams.token_type + " " + this.hashParams.access_token}}).then(function(resp){
                    resolve(resp.body);
                }, function(error){
                    this.loginError(error);
                    reject(error);
                });
            });
        },

        //Add Tracks to a Playlist
        //https://developer.spotify.com/web-api/add-tracks-to-playlist/
        addTracksToPlaylist(playlist_id, track){
            let request = {
              "uris": ["spotify:track:" + track]
            }

            this.getCredentials();

            return new Promise((resolve, reject) => {
                this.$http.post('https://api.spotify.com/v1/users/' + this.SpotifyUserDetails.id + '/playlists/' + playlist_id + '/tracks', request, {headers: {'Authorization': this.hashParams.token_type + " " + this.hashParams.access_token}}).then(function(resp){
                    resolve(resp);
                  }, function(error){
                    this.loginError(error);
                    reject(error);
                  });
            });
        },

        //Remove Tracks from a Playlist
        //https://developer.spotify.com/web-api/remove-tracks-playlist/
        removeTracksFromPlaylist(track_id, playlist_id){
            this.getCredentials();

            let request = {
              body: { "tracks": [{ "uri": "spotify:track:" + track_id }] },
              headers: {'Authorization': this.hashParams.token_type + " " + this.hashParams.access_token}
            };
      
            return new Promise((resolve, reject) => {
                this.$http.delete('https://api.spotify.com/v1/users/' + this.SpotifyUserDetails.id + '/playlists/' + playlist_id + '/tracks', request).then(function(resp){
                    resolve(resp);
                }, function(error){
                    this.loginError(error);
                    reject(error);
                });
            });
        },

        loginError(error){
            this.$session.logout();
            this.$router.push({name: 'Lobby', params: error});
        }
    }
}