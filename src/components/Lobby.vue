<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import EventBus from '../helpers/event-bus.js';

export default {
  name: 'Lobby',
  beforeCreate(){
      EventBus.$emit('logged-in');
      // if (this.$route.params) console.log(this.$route.params);
  },
  data () {
    return {
      msg: 'Welcome to HOME page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
