<template>
    <div class="track" v-on:click="add(track.id)" v-bind:data-id="track.id">
        <img v-bind:src="track.album.image" />
        <span class="track-name">{{track.name}}</span>
        <span class="track-info"><a href="#" v-on:click.prevent.stop="go('artist',track.artist.id)">{{track.artist.name}}</a>,
        <a href="#" v-on:click.prevent.stop="go('album',track.album.id)">{{track.album.name}}</a></span>
  </div>
</template>

<script>
// import Vue from 'vue'

module.exports = {
  name: 'track-item',
  props: ['track'],
  data () {
    return {

    }
  },
  components: {
  },
  methods: {
    add: function (id) {
      this.$root.add(id)
    },
    go: function (path, id) {
      this.$router.push({name: path, params: { id: id }})
    }
  }
}
</script>

<style scoped>

.track img {
  height: 60px;
  filter: grayscale(100%);
  transition: all 0.2s ease;  

}

.track {
  position: relative;
  width: 100%;
  background-color: white;
  margin-top: 4px;
  margin-bottom: 4px;
  transition: all 0.2s ease;

  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;  

  cursor: copy;
  padding-right: 4px;

  background-position: right 25px center;
  background-size: 0px;
  background-repeat: no-repeat;

}

.track .track-name {
  cursor: copy;
  padding-left: 9px;
}

.track:hover {
  transform: scale(1.02,1.02);
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.15);  
  z-index: 1;

}

.track:hover img {
  filter: grayscale(0%);
}

.track:active {
   transform: scale(1.01,1.01);
 
}

.queued {
  padding-right:50px;
  background-image: url('/static/checkmark.png') !important;
  background-position: right 20px center !important;;
  background-size: 20px;
}
.queued::after {
}
.playing {
  padding-right:50px;

  background-image: url('/static/playing.png') !important;
  background-position: right 21px center !important;;
  background-size: 20px;


}

</style>