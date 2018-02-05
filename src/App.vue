<template>
  <div id="app">
    <!-- <header-nav></header-nav> -->
    <app-nav></app-nav>
    <div class="container app-content">
        <router-view></router-view>
      </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: { 
    'app-nav': Header,
    'app-footer': Footer
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

body {
  background-image: linear-gradient(rgb(74, 79, 76), rgb(7, 7, 7) 85%);
}

html, body, #app {
  height: 100%;
  margin: 0;
}

.container {
  min-height: 100%;
  margin-bottom: -50px;
}

footer {
  height: 50px;
  background: #2c3e50;
}
</style>
