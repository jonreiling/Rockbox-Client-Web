import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './pages/Search.vue'
import Album from './pages/Album.vue'
import Artist from './pages/Artist.vue'
import Home from './pages/Home.vue'
import jQuery from 'jQuery'
import Pusher from 'pusher-js' // import Pusher

// const server = 'https://quiet-ridge-78128.herokuapp.com'
const server = 'http://rockbox.jonreiling.com'

Vue.use(require('vue-resource'))
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
  created () {
    // ...
    this.setPusher()

    Vue.http.jsonp(this.$root.server + '/api/v1/', {'jsonp': 'callback'}).then((response) => {
      // success callback
      var data = response.body
      console.log(response.body)
      player.track = data.queue.shift()
      player.queue = data.queue
      player.playing = data.state.playing
      player.volume = data.state.volume
      jQuery('#volume').val(data.state.volume)
    }, (response) => {
      // error callback
      console.log(response)
    })
  },
  methods: {
    togglePlayPause: function () {
      Vue.http.post(server + '/api/v1/pause')
    },
    skip: function () {
      Vue.http.post(server + '/api/v1/skip', {'jsonp': 'callback'})
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
    },
    setPusher: function () {
      let pusher = new Pusher('1276e8d2c9675878f90d', { cluster: 'us2' })
      pusher.subscribe('rockbox')
      pusher.bind('play-state-updated', data => {
        console.log('play-state-updated')
        player.playing = data.playing
      })

      pusher.bind('queue-updated', data => {
        Vue.http.jsonp(this.$root.server + '/api/v1/queue', {'jsonp': 'callback'}).then((response) => {
          // success callback
          var data = response.body
          data.shift()
          player.queue = data
          viewer.updateQueue()
        }, (response) => {
          // error callback
          console.log(response)
        })
      })

      pusher.bind('track-updated', data => {
        console.log('track-updated')
        console.log(data)
        player.track = data.track
        viewer.updateCurrentlyPlaying()
      })

      pusher.bind('volume-updated', data => {
        console.log('volume-updated')
        player.volume = data.volume
        jQuery('#volume').val(data.volume)
      })
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
//      update.queue = update.queue.shift()
      console.log(update)
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
