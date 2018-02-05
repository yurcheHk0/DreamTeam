<template>
  <div class="hello" v-if="playlist">
    <h1>{{playlist.name}}</h1>
    <div>{{playlist.owner.display_name}}</div>
    <div>{{playlist.tracks.total}} Songs</div>
    <img v-if="playlist.images[0]" :src="playlist.images[0].url">
    <img v-else src="https://ru.vuejs.org/images/logo.png">
    <ul>
      <li v-for="track in playlist.tracks.items"  class="tracklist-row">
        <div class="track-name">{{track.track.name}}</div>
        <div class="track-artists"><span v-for="artist in track.track.artists">{{artist.name}} </span></div>

        <div>
          <b-dropdown id="ddown1" text="Dropdown Button" class="m-md-2" variant="success">
            <b-dropdown-item @click="addToPlaylistPopup($event)" :value="track.track.id">Add to Playlist</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="removeSongFromPlaylist($event)" v-if="playlist.owner.id === userId" :value="track.track.id">Remove from this Playlist</b-dropdown-item>
            <b-dropdown-item @click="removeSongFromPlaylist($event)" v-else disabled :value="track.track.id">Remove from this Playlist</b-dropdown-item>
          </b-dropdown>
        </div>
        
      </li>
    </ul>
  
  <!-- Add To Playlist pop-up-->
    <div class="pop-up">
      <div class="close" @click="closeAddToPlaylistPopup($event)"></div>
      <h1>{{ popupMsg }}</h1>
      <button class="">NEW PLAYLIST</button>

      <div v-if="allUserPlaylists">

        <ul>
          <li v-for="items in allUserPlaylists.items" :key="items.id" v-if="items.owner.id === userId" @click="addToCurrentPlaylist()"  :value="items.id">
            <img v-if="items.images[0]" :src="items.images[0].url">
            <img v-else src="https://ru.vuejs.org/images/logo.png">
            <div>{{items.name}}</div>
            <div>{{items.tracks.total}} songs</div>
          </li>
        </ul>
      
      </div>
    
  </div>
  
  </div>
</template>

<script>

//
//TODO: ?create separetad component for pop-up [add to playlist + create new playlest]
//
import $spotify from '../mixins/spotify.js';

export default {
  name: 'DetailedPlaylist',
  mixins: [ $spotify ],

  beforeMount(){
    if ( !this.$session._isLoggedIn() ) {
        this.$router.push({name: 'Lobby'})
        return;
      };

    this.getListSongs();
  },

  data () {
    return {
      popupMsg: 'Add to playlist',
      userId: null,
      playlist: null,
      allUserPlaylists: null,
      addSong: null
    }
  },

  methods:{
     getListSongs: function() {
      this.userId = JSON.parse(this.$localStorage.get('User')).id;

      this.getPlaylist(this.$route.params).then((data) => {
        this.playlist = data;
      });
    },

    addToPlaylistPopup: function(event){
      this.addSong = event.currentTarget.getAttribute("value");

      this.getListOfCurrentUserPlaylists().then((data) => {
        this.allUserPlaylists = data;
        this.$dom.addClass(this.$dom.getElements('.pop-up')[0], 'active');
      });
    },

    closeAddToPlaylistPopup: function() {
      this.$dom.removeClass(this.$dom.getElements('.pop-up')[0], 'active');
      this.addSong = null;
    },

    addToCurrentPlaylist: function(){
      let playlist_id = event.currentTarget.getAttribute("value");

      this.addTracksToPlaylist(playlist_id, this.addSong).then((data) => {
        this.addSong = null;
        this.closeAddToPlaylistPopup();
      });
    },

    removeSongFromPlaylist: function() {
      let playlist_id = this.playlist.id;
      let track_id = event.currentTarget.getAttribute("value");

      this.removeTracksFromPlaylist(track_id, playlist_id).then((data) => {
         this.getListSongs();
      });
    }
     
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  max-width: 200px;
}
li {
  list-style: none;
}
.tracklist-row {
  margin: 20px
}
/* .tracklist-row div {
  float:left;
} */
.track-name {
  font-weight: bold;
  font-size: 20px;
}

.track-option {
  border: 1px solid green;
  background: green;
  width: 20%;
  border-radius: 10px;
  cursor: pointer;
}
.oprtions-box {
  background: yellow;
  display: none;
  width: 100%;
  height: 100px;
}
.activeOptionBox .oprtions-box {
  display: block;
}

.pop-up h1 {
  letter-spacing: -.005em;
  font-weight: 600;
  color: #fff;
  text-transform: none;
  font-size: 72px;
  line-height: 82px;
}

.pop-up {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
}

.pop-up.active {
  display: block;
}

.close {
  width: 100px;
  height: 100px;
  background: green;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}
</style>
