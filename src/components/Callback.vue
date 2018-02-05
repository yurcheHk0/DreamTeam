<template>
</template>

<script>
import $spotify from '../mixins/spotify.js';
import EventBus from '../helpers/event-bus.js';

export default {
  name: 'Callback',
  mixins: [ $spotify ],
  beforeMount(){
      this.parseHash()
  },
  
  methods:{
     parseHash: function() {
      let response = this.$route.query;
      
      if (response.error) {this.$router.push({name: 'Lobby', params: response.error}); };

      let hashParams = {};
      var e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&;=]+)=?([^&;]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
          q = window.location.hash.substring(1);

      while (e = r.exec(q))
        hashParams[d(e[1])] = d(e[2]);

      let UserCred = {
        "token_type": hashParams.token_type,
        "access_token": hashParams.access_token,
        "expires_in": hashParams.expires_in
      }
      
      this.$localStorage.set('UserAuthHash', JSON.stringify(UserCred));

      EventBus.$emit('logged-in');

      this.getCurrentUserProfile().then((data) => {
       this.$localStorage.set('User', JSON.stringify(data));
      //  this.$router.push({ name: 'Playlist', params: { data: data }});
      });

      this.getListOfCurrentUserPlaylists().then((data) => {
       this.$localStorage.set('SpotifyUserDetails', JSON.stringify(data));
       this.$router.push({ name: 'Playlist', params: { data: data }});
      });
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
