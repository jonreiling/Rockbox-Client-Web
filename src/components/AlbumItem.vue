<template>
    <div class="album">
      <router-link :to="{ name: 'album', params: { id: album.id }}">
            <div class="videoWrapper"><img v-bind:src="album.image" /></div>
            <div class="album-name">
              <div class="track-name">{{album.name}}</div>
              <div class="track-info">
                {{album.artist.name}}
              </div>           
            </div>
      </router-link>
    </div>
</template>

<script>
module.exports = {
  name: 'album-item',
  props: ['album'],
  data () {
    return {

    }
  },
  components: {
  }
}
</script>

<style scoped>

.album {
  width: 100%;
  background-color: white;
  border: 1px solid #eeeeee;
  transition: all 0.2s ease;
  position: relative;

  margin-bottom: 20px;
}

.album img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  transition: all 0.2s ease;
  object-fit:cover;

  left: 0;
  position: absolute;
  top: 0;


}

.album:hover {
  transform: scale(1.03,1.03);
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.15);  
  z-index: 1;

  text-decoration: none;
}

.album:hover img {
  filter: grayscale(0%);
}

.album:active {
   transform: scale(1.01,1.01);
}

a:hover {
  text-decoration: none;
}

.album-name {
  height:80px;
  padding-top:20px;
  padding-right:20px;
  padding-left:20px;
  overflow: hidden; 

}

.album .track-name {
  overflow: hidden;
  max-height: 28px;
    display: -webkit-box;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; 

  margin-bottom: 0px;
  padding-bottom: 0px;
  line-height: 1.1em;
  word-wrap:break-word;
}

.album .track-info {
  margin-top:1px;
  max-height: 18px;
  overflow: hidden; 

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical; 

}

.videoWrapper {
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;
    margin-bottom: 0px
}


.album:hover .album-name {
  text-decoration: none;

}

</style>