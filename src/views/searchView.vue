<template>
  <div class="container mt-5">
    <div class="row">
      <h3 class="mainTitle">以下為搜尋結果：</h3>
      <div class="card search" v-for="m in movies" :key="m.id">
        <router-link :to="`/movieinfo/${m.id}`" class="h-100">
          <div class="imgCon">
            <div>
            <img :src="(`https://www.themoviedb.org/t/p/original/${m.poster_path}`)" alt="" 
            loading="lazy"
            class="img">
          </div>
          </div>
          <div class="textInfo">
            <h4>{{m.title}}</h4>
            <p>{{m.release_date}}</p>
            <p class="overview tBrief mt-3">{{m.overview}}</p>
          </div>
        </router-link>
      </div>
      
    </div>
  </div>
  <MyFooter/>
</template>
<script setup>
// import { onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
// import { useRoute } from "vue-router";
// const route = useRoute();
// import axios from "axios";
import { mapState } from '../map-state';
import MyFooter from '../components/MyFooter.vue';
const { movies } = mapState();
// const { nextPage } = mapActions();
let page = store.state.currentPage;
console.log(page);
// page++;
// console.log(page);
// let num = 1;
// function prevPage(){
//   console.log(num);
//   num++;
//   console.log(num);
// }
// onMounted(() => {
//   store.dispatch("loadingNowmovies");
//   if (JSON.stringify(store.state.movies) == "[]") {
//       store.dispatch("searchMovies");
//   }
// });

</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>