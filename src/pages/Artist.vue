<template>
  <div id="artist">
    <div class="row">

      <div class="col-xs-12 col-lg-12">
        <h3>{{artist.name}}</h3>
        <div class="row">
            <div class="col-xs-6 col-lg-4 col-xl-4" v-for="album in artist.albums" >
              <album-item v-bind:album="album"></album-item>
            </div>
        </div>

        <h3 style="padding-top:40px" v-if="artist.name">Top tracks</h3>
      
        <div v-for="track in artist.topTracks">
          <track-item v-bind:track="track"></track-item>
        </div>

      </div>


  </div>

  </div>
</template>

<script>
import Vue from 'vue'
import TrackItem from '../components/TrackItem.vue'
import AlbumItem from '../components/AlbumItem.vue'

export default {
  name: 'album',
  data () {
    return {
      artist: {}
    }
  },
  components: {
    TrackItem,
    AlbumItem
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
      var id = this.$route.params.id
      Vue.http.jsonp(this.$root.server + '/api/v1/browse/artist/' + id, {'jsonp': 'callback'}).then((response) => {
        // success callback
        console.log(response.body)
        this.artist = response.body
      }, (response) => {
        // error callback
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

#artist img {
  width: 100%;
  object-fit: cover;
  object-position: center center;
  margin-bottom: 15px;
}
.col-xs-6 {
}

</style>