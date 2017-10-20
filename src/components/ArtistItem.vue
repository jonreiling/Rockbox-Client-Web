<template>
    <div class="artist">
      <router-link :to="{ name: 'artist', params: { id: artist.id }}">

        <div class="rounder">
        <div class="videoWrapper">
          <img v-bind:src="artist.image" v-if="artist.image" />
          <img src="/static/artist.png" v-if="!artist.image" />
        </div>
      </div>
        <div class="artist-name">
         {{artist.name}}
        </div>
      </router-link>
  </div>
</template>

<script>
module.exports = {
  name: 'artist-item',
  props: ['artist'],
  data () {
    return {

    }
  },
  components: {
  }
}
</script>

<style scoped>

.artist {
  width: 100%;
  transition: all 0.2s ease;
  position: relative;

  text-align: center;
  padding:30px;
}

.artist a {
  font-family: "bentonsansbold";   
  font-size: .8em;  
  letter-spacing: .1em;
  text-transform: uppercase;
  color: black;

}

.artist:hover .rounder {

  transform: scale(1.05,1.05);
}
.rounder {
  clip-path: circle(50% at center);
  transition: transform 0.2s ease;

}

.artist a:hover {
  text-decoration: none;
}

.artist img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;

  filter: grayscale(100%);
  transition: all 0.2s ease;  

}

.artist-name {
  height:80px;
  padding-top:20px;
  padding-right:20px;
  padding-left:20px;
  overflow: hidden; 

}

.artist .videoWrapper {
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;
    margin-bottom: 0px;

}

.artist img {
  width: 100%;
  height: 100%;

  left: 0;
  position: absolute;
  top: 0;
}


</style>