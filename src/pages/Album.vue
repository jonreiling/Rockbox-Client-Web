<template>
  <div id="album">
    <h3 v-if="album.name">{{album.artist.name}}, {{album.name}}</h3>
    <div class="row">
      <div v-if="album.name" class="col-xs-12 col-lg-3">
        <img v-bind:src="album.image" />
          <a class="add-to-queue" href="#" v-on:click.prevent.stop="addAlbum(album.id)">Add Album to Queue</a>
      </div>
      <div class="col-xs-12 col-lg-9">
        <track-item v-for="track in album.tracks" v-bind:track="track"></track-item>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TrackItem from '../components/TrackItem.vue'

export default {
  name: 'album',
  data () {
    return {
      album: {
        artist: {}
      }
    }
  },
  components: {
    TrackItem
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
      Vue.http.get(this.$root.server + '/api/v1/browse/album/' + id).then((response) => {
        // success callback
        this.album = response.body.results
      }, (response) => {
        // error callback
        console.log(response)
      })
    },
    addAlbum: function (id) {
      this.$root.add(id)
    }
  }
}
</script>

<style scoped>

.add-to-queue {
  width: 100%;
  background-color: white;
  padding: 20px;
  padding-right: 30px;

  background-image: url('/static/add.png') !important;
  background-position: right 20px center;
  background-size: 20px;
  background-repeat: no-repeat;
  display: block;


  font-family: "bentonsansbold";   
  font-size: .8em;  
  letter-spacing: .1em;
  text-transform: uppercase;
  color: black;

  cursor: copy;
}

a.add-to-queue:hover {
  opacity: .6;
}


a.add-to-queue {
  text-decoration: none;

}

#album h4 {
  font-weight: 300;
  font-family: "bentonsanslight";
  padding-top:30px;
}

#album img {
  width: 100%;
}
</style>