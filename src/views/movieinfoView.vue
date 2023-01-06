<template>
  <div v-if="movie">
    <div
      class="poster bgImg"
      :style="{
        backgroundImage: `url(https://www.themoviedb.org/t/p/original/${movieRef.backdrop_path})`
      }"
    >
    </div>
    <div class="infoCon">
      <!-- <h3>{{ movieId }}</h3> -->
      <p class="original_title">{{ movieRef.original_title }}</p>
      <h2 class="title">{{ movieRef.title }}</h2>
      <div class="d-flex align-items-end">
        <div class="btn" @click="togglePopup">
          <img src="@/assets/img/player.png" alt="" style="width: 20px" />
          預告片
        </div>
        <div class="vote">
          <span>{{ movieRef.vote_average }}</span>
        </div>
        <span>平均評分</span>
      </div>
      <div class="timeDetail mt-2">
        <p>{{ movieRef.runtime }}分鐘 |</p>
        <p>{{ movieRef.release_date }} |</p>
        <!-- <p>{{movieRef.genres}}</p> -->
        <div class="type" v-for="g in movie.genres" :key="g.id">
          <p>{{ g.name }}</p>
        </div>
      </div>

      <h4 v-if="movieRef.tagline" class="tagline mt-3">
        "{{ movieRef.tagline }}"
      </h4>

      <p class="overview mt">{{ movieRef.overview }}</p>
      <h6 class="mainTitle mt-4 mb-1">製作國家</h6>
      <div
        v-for="country in movie.production_countries"
        :key="country.iso_3166_1"
      >
        <p>{{ country.name }}</p>
      </div>
      <h6 class="mainTitle mt-3 mb-1">語言</h6>
      <div v-for="language in movie.spoken_languages" :key="language.iso_639_1">
        <p>{{ language.name }}</p>
      </div>
    </div>
    <!-- <video
      id="my-video"
      class="video-js"
      controls
      width="400"
      height="180"
      data-setup="{}"
    ></video> -->
    <div class="mask" v-if="popupOpen" @click="togglePopup"></div>
    <div v-if="videoKey" class="popupBox">
      <iframe
        v-if="popupOpen"
        loading="lazy"
        width="400"
        height="230"
        :src= src
      >
      </iframe>
    </div>
    <div v-else class="popupBox">
      <div v-if="popupOpen" class="modal">
        <p>此電影未提供預告片唷!</p>
      </div>
    </div>
  </div>
  <MyFooter/>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import { computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import MyFooter from '../components/MyFooter.vue';
// import videojs from "video.js/dist/video.min";
// import "video.js/dist/video-js.min.css";
const route = useRoute();
// import { mapState } from "../map-state";
// const { comingMovies } = mapState();
// const { cnextPage,cprevPage } = mapActions();
let movieRef = ref({});
let movie = movieRef.value;
let movieId = route.params.id;
let src =ref('');
//popup modal視窗
const popupOpen = ref(false);
const togglePopup = () => {
  popupOpen.value = !popupOpen.value;
};

onMounted(() => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW&append_to_response=videos,images`
    )
    .then(res => {
      // console.log({ data: res.data });
      movieRef.value = res.data;
      movie = movieRef.value;
      movieId = movie.id;
      console.log(movieId);
      console.log(movie);

      console.log(movie.genres); //proxy{0:{id:28,name:'動作'},1:{...},2:{...}}
      // console.log(movie.genres.slice(0,3));
      if (movie.genres.length > 2) {
        movie.genres.splice(3);
      }
      // movie.genres.pop();
      movie.genres.forEach(function(value) {
        console.log(value.name);
        value.name = value.name + ",";
      });
      console.log(movie.genres);
      // let tt = 16.432;
      movie.vote_average = Math.round(movie.vote_average * 10) / 10;
      console.log(movie.vote_average);

      let videoKey = movie.videos.results.pop().key;
      src = `https://www.youtube.com/embed/${videoKey}`;
      console.log(src);
    })
    .catch(err => console.dir(err));
});

//function videoPlayer() {
  // let myPlayer = videojs("my-video");
  // let videoKey = movie.videos.results.pop().key;
  // console.log(`https://www.youtube.com/watch?v=${videoKey}`);
  // myPlayer.src([
  //   { src: `https://www.youtube.com/watch?v=${videoKey}`, type: "video/webm" },
  //   { src: `https://www.youtube.com/watch?v=${videoKey}`, type: "video/mp4" }
  // ]);
  // myPlayer.ready(function() {
  //   // myPlayer.src({src: "https://playtv-live.ifeng.com/live/06OLEGEGM4G.m3u8"}); //https://playtv-live.ifeng.com/live/06OLEGEGM4G.m3u8
  //   // movie.videos.results.forEach(function(item){
  //   //   // myPlayer.src({src: `https://www.youtube.com/watch?v=${item.key}`});
  //   //   console.log(`https://www.youtube.com/watch?v=${item.key}`);
  //   // })
  //   myPlayer.play();
  //   myPlayer.pause();
  //   myPlayer.muted(true);
  //   // myPlayer.isFullscreen(true);
  //   //console.log(myPlayer.muted());
  // });
//}
</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>
