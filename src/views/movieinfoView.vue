<template>
  <div v-if="movie">
    <div class="posterBg"></div>
    <div class="infoCon mt-4">
      <!-- <h3>{{ movieId }}</h3> -->
      <p>{{movieRef.original_title}}</p>
      <h2>{{movieRef.title}}</h2>
      <div class="btn my-2">預告片</div>
      <div class="detail">
        <p>{{movieRef.runtime}}分鐘</p>
        <p>{{movieRef.release_date}}</p>
        <!-- <p>{{movieRef.genres}}</p> -->
      </div>
      <h4 v-if="movieRef.tagline" class="tagline mt-3">"{{movie.tagline}}"</h4>
      <h3 class="mainTitle mt-3">概要</h3>
      <p>{{movieRef.overview}}</p>
      
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
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
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW`
    )
    .then(res => {
      // console.log({ data: res.data });
      movieRef.value = res.data;
      movie = movieRef.value;
      movieId = movie.id;
      // mTitle = movie.title
      console.log(movieId);
      console.log(movie);
      // console.log(mTitle);
    })
    .catch(err => console.dir(err));
});

</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>
