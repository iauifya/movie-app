<template>
  <div class="container mt-5">
    <div class="row">
      <div class="card search" v-for="m in movies" :key="m.id">
        <div class="imgCon">
          <div class="img" :style="{ backgroundImage: `url(https://www.themoviedb.org/t/p/original/${ m.poster_path})`}">
          </div>
        </div>
        <div class="textInfo">
          <h4>{{m.title}}</h4>
          <p>{{m.release_date}}</p>
          <p class="overview mt-3">{{m.overview}}</p>
        </div>
      </div>
      <div class="btn"  @click="nextPage">下一頁</div>
      <div class="btn"  @click.prevent="prevPage()">上一頁</div>
    </div>
  </div>
</template>
<script setup>
// import { onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
// import { useRoute } from "vue-router";
// const route = useRoute();
// import axios from "axios";
import { mapState,mapActions } from '../map-state';
const { movies } = mapState();
const { nextPage } = mapActions();
let page = store.state.currentPage;
console.log(page);
// page++;
// console.log(page);
let num = 1;
function prevPage(){
  console.log(num);
  num++;
  console.log(num);
}
// onMounted(() => {
//   store.dispatch("loadingNowmovies");
//   if (JSON.stringify(store.state.movies) == "[]") {
//       store.dispatch("searchMovies");
//   }
// });

</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>