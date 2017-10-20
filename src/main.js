import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import VueRouter from 'vue-router'
import Search from './pages/Search.vue'
import Album from './pages/Album.vue'
import Artist from './pages/Artist.vue'
import Home from './pages/Home.vue'
import jQuery from 'jQuery'

const server = 'https://quiet-ridge-78128.herokuapp.com'
// const server = 'http://localhost:3000'

Vue.use(require('vue-resource'))
Vue.use(VueSocketio, server + '/rockbox-client')
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/search/:searchterm', name: 'bar', component: Search },
    { path: '/album/:id', name: 'album', component: Album },
    { path: '/artist/:id', name: 'artist', component: Artist }
  ]
})

var player = new Vue({
  el: '#player',
  router,
  data: {
    server: server,
    track: null,
    playing: false,
    volume: 30,
    queue: [],
    searchterm: '',
    showQueue: false
  },
  methods: {
    togglePlayPause: function () {
      Vue.http.post(server + '/api/v1/pause')
    },
    skip: function () {
      Vue.http.post(server + '/api/v1/skip')
    },
    search: function () {
      router.push('/search/' + player.searchterm)
      document.activeElement.blur()
    },
    updateVolume: function () {
      Vue.http.post(server + '/api/v1/volume', {volume: jQuery('#volume').val()})
    },
    bumpVolume: function (direction) {
      Vue.http.post(server + '/api/v1/volume', {bump: direction})
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
      jQuery('#disconnected').css('display', 'none')
    },
    disconnect: function () {
      console.log('socket disconnected')
      this.track = null
      this.playing = false
      this.queue = []
      viewer.updateTracks()
      jQuery('#disconnected').css('display', 'inherit')
    },
    playStateUpdate: function (update) {
      player.playing = update.playing
    },
    queueUpdate: function (update) {
      console.log('queueUpdate')
      player.queue = update.queue
      viewer.updateQueue()
    },
    trackUpdate: function (update) {
      player.track = update.currentTrack
      viewer.updateCurrentlyPlaying()
    },
    volumeUpdate: function (update) {
      player.volume = update.volume
      jQuery('#volume').val(player.volume)
    },
    connectionUpdate: function (update) {
      if (update.connectedToPlayer) {
        jQuery('#disconnected').css('display', 'none')
      } else {
        jQuery('#disconnected').css('display', 'inherit')
      }
      console.log('connectionUpdate', update.connectedToPlayer)
    }
  }
})

/* eslint-disable no-new */
var viewer = new Vue({
  router,
  data: {
    server: server
  },
  methods: {
    add: function (id) {
      Vue.http.post(server + '/api/v1/add', {'id': id})
    },
    updateCurrentlyPlaying: function () {
      jQuery('[data-id]').removeClass('playing')

      if (player.track != null) {
        jQuery('[data-id="' + player.track.id + '"]').removeClass('queued')
        jQuery('[data-id="' + player.track.id + '"]').addClass('playing')
      }
    },
    updateQueue: function () {
      jQuery('.queued').removeClass('queued')
      for (var i = 0; i < player.queue.length; i++) {
        jQuery('[data-id="' + player.queue[i].id + '"]').addClass('queued')
      }
    },
    updateTracks: function () {
      this.updateQueue()
      this.updateCurrentlyPlaying()
    }
  }

}).$mount('#app')
