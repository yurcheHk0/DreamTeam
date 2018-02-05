<template>
  <header>
    <!-- <b-navbar> supports the standard Bootstrap V4 available background color variants -->
    <!-- primary, success, info, warning, danger, dark, or light. -->
    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">
      <img src="../assets/img/logo.png" class="d-inline-block align-top logo" alt="BV">
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="'/'">Home</b-nav-item>
            <b-nav-item :to="'/playlists'"> Playlists</b-nav-item>
            <b-nav-item :to="'search'" disabled>Search</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-button @click="login()" variant="success" v-if="!isLogedIn">Login</b-button>

            <b-nav-item-dropdown right  v-else>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{username}}</em>
            </template>
            <b-dropdown-item href="#" disabled>Profile</b-dropdown-item>
            <b-dropdown-item @click="logout()">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import EventBus  from '../helpers/event-bus.js';

export default {
  data() {
    return {
      isLogedIn: false,
      username: null
    }
  },

  beforeMount() {
    this.updateUserStatus();
    EventBus.$on('logged-in', function(){
      this.updateUserStatus();
    }.bind(this))
  },

  methods: {
    login: function(){
      //Flow https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow
      //Scope https://developer.spotify.com/web-api/using-scopes/
      const client_id      = 'b6df99a66f8d4d2485471b56f27bc2ea';
      const redirect_uri   = 'http://localhost:8080/callback';
      const response_type  = 'token';
      const scope          = 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-library-read user-library-modify user-read-birthdate user-read-private user-top-read user-read-recently-played user-read-currently-playing';

      window.location.href = "https://accounts.spotify.com/authorize/?client_id=" +
                             client_id + "&response_type=" +
                             response_type + "&redirect_uri=" +
                             redirect_uri + "&scope=" +
                             scope;
    },
    logout: function() {
      this.$session.logout();
      this.$router.push({name: 'Lobby'});
    },
    updateUserStatus(){
      this.$data.isLogedIn = this.$session._isLoggedIn();
      this.$data.username = JSON.parse(localStorage.User).display_name || 'unnamed';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-width: 30px;
  }
</style>
