import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import BootstrapVue from 'bootstrap-vue'

import Dom from '@/helpers/dom'
import Auth from '@/helpers/auth'

import Lobby from '@/components/Lobby'
import Callback from '@/components/Callback'
import Playlist from '@/components/Playlists'
import DetailedPlaylist from '@/components/DetailedPlaylist'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export const EventBus = new Vue();

Vue.use(Router);
Vue.use(VueResource);
Vue.use(VueLocalStorage)
Vue.use(BootstrapVue)
Vue.use(Dom);
Vue.use(Auth);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Lobby',
      component: Lobby
    }, 
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/playlists',
      name: 'Playlist',
      component: Playlist
    },
    {
      path: '/detailed-playlist/:user_id/playlist/:playlist_id',
      name: 'DetailedPlaylist',
      component: DetailedPlaylist
    }
  ]
})


