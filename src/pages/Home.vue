<template>
  <div id="home">
    <h3>Recent Releases</h3>
    <div class="row">
        <div class="col-xs-6 col-lg-4 col-xl-4" v-for="album in albums" >
          <album-item v-bind:album="album"></album-item>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import AlbumItem from '../components/AlbumItem.vue'

export default {
  name: 'home',
  data () {
    return {
      albums: []
    }
  },
  components: {
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
      Vue.http.jsonp(this.$root.server + '/api/v1/browse/new-releases/', {'jsonp': 'callback'}).then((response) => {
        // success callback
        console.log(response.body)
        this.albums = response.body
      }, (response) => {
        // error callback
        console.log(response)
      })
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

  cursor: pointer !important;
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