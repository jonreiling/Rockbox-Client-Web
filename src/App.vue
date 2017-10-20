<template>
  <div id="app">
    <img src="./assets/logo.png">
  <div id="player">
  </div>
  </div>
</template>

<script>
import Player from './components/Player'

export default {
  name: 'app',
  components: {
    Player
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
