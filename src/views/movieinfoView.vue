<template>
  <div v-if="movie">
    <div class="poster bgImg" :style="{
      backgroundImage: `url(https://www.themoviedb.org/t/p/original/${movieRef.backdrop_path})`}">
    </div>
    <div class="infoCon">
      <!-- <h3>{{ movieId }}</h3> -->
      <p class="original_title">{{movieRef.original_title}}</p>
      <h2 class="title">{{movieRef.title}}</h2>
      <div class="btn my-2">
        <img src="@/assets/img/player.png" alt="" style="width: 20px">
        預告片
      </div>
      <div class="detail">
        <p>{{movieRef.runtime}}分鐘</p>
        <p>{{movieRef.release_date}}</p>
        <!-- <p>{{movieRef.genres}}</p> -->
        <span v-for="g in movie.genres" :key="g.id">{{g.name}}</span>
      </div>
      <h4 v-if="movieRef.tagline" class="tagline mt-3">"{{movieRef.tagline}}"</h4>
      <h3 class="mainTitle mt-3">概要</h3>
      <p>{{movieRef.overview}}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import { computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
// import { mapState } from "../map-state";
// const { comingMovies } = mapState();
// const { cnextPage,cprevPage } = mapActions();
let movieRef = ref({});
let movie = movieRef.value;
let movieId = route.params.id;
// let mTitle = '';
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
      console.log(movieRef);
      // let genres = movie.genres.map(function(item){
      //   return item;
      // });
      // console.log(genres);  //[proxy{id:28,name:'動作'},proxy{...},proxy{...}]
      console.log(movie.genres); //proxy{0:{id:28,name:'動作'},1:{...},2:{...}}
    })
    .catch(err => console.dir(err));
});

</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>
