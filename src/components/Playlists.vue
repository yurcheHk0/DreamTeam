<template>
  <div class="Playlists">
    <h1>{{ msg }}</h1>
      <b-card-group deck>
        <router-link v-for="item in items" :key="item.id+item.owner.id" tag="div" :to="'/detailed-playlist/' + item.owner.id + '/playlist/' + item.id">
            <b-card :title="item.name"
                    :img-src="item.images[0].url"
                    img-alt="Img"
                    style="width: 10rem;"
                    img-top>
                <p class="card-text">
                    {{item.owner.display_name}}
                </p>
            </b-card>
        </router-link>
      </b-card-group>
    <!-- Playtlists cover with title and owner name. On click open selected playlist /DetailedPlaylist:playlistId-->

  </div>
</template>

<script>
import $spotify from '../mixins/spotify.js';

export default {
  name: 'Playlist',
  mixins: [ $spotify ],
  data () {
    return {
      msg: 'Welcome to Playlist page',
      items: []
    }
  },
  
  methods: {
    getUserPlaylists: function() {
        this.getListOfCurrentUserPlaylists().then((data) => {
          this.items = data.items;
        });
      }
  },

  beforeMount(){
    if ( !this.$session._isLoggedIn() ) {
      this.$router.push({name: 'Lobby'})
      return;
    };

    let userPlalistItems = this.$route.params.data ? this.$route.params.data.items : null;
    userPlalistItems ? this.items = userPlalistItems : this.getUserPlaylists();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-title {
    margin-bottom: 0.45rem;
    font-size: 1.2rem;
  }

  .card-body {
    padding: 1.25rem 0 0;
  }

  .card {
    border: none;
    cursor: pointer;
    background: transparent;
  }
  
  .card:hover {
    border: 3px solid rgba(247, 247, 247, 0.8);
    padding: 3px;
  }
</style>
