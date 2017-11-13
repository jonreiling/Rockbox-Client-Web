<template>
  <div id="search">
    <h3>Search for '{{this.$route.params.searchterm}}'</h3>
    <div class="row">
      <div class="col-xs-12 col-lg-8" style="margin-bottom:40px">
        <track-item v-for="track in tracks" v-bind:track="track"></track-item>
      </div>
      <div class="col-xs-12 col-lg-4">
        <div class="row">
          <div class="col-xs-6" v-for="album in albums" >
            <album-item v-bind:album="album"></album-item>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div  v-for="artist in artists" class="col-xs-6 col-md-3">
        <artist-item v-bind:artist="artist"></artist-item>
      </div>
    </div>



  </div>
</template>

<script>
import Vue from 'vue'
import TrackItem from '../components/TrackItem.vue'
import AlbumItem from '../components/AlbumItem.vue'
import ArtistItem from '../components/ArtistItem.vue'

export default {
  name: 'search',
  data () {
    return {
      tracks: [],
      albums: [],
      artists: []
    }
  },
  components: {
    TrackItem,
    AlbumItem,
    ArtistItem
  },
  created () {
    this.fetchData()
  },
  updated () {
    this.$parent.updateTracks()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.tracks = []
      this.albums = []
      this.artists = []
      var searchterm = this.$route.params.searchterm
      Vue.http.jsonp(this.$root.server + '/api/v1/search/' + searchterm, {'jsonp': 'callback'}).then((response) => {
        // success callback
        this.tracks = response.body.tracks
        this.albums = response.body.albums
        this.artists = response.body.artists
      }, (response) => {
        // error callback
        console.log(response)
      })
    }
  }
}
</script>

<style>

</style>