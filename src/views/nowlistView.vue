<template>
  <div class="container my-4">
    <div class="row">
      <h3 class="mainTitle">現正熱播影片列表</h3>
      <div class="card main list" v-for="nowM in nowMovies" :key="nowM.id">
        <router-link :to="`/movieinfo/${nowM.id}`" class="h-100">
          <div class="imgCon">
            <img :src="(`https://www.themoviedb.org/t/p/original/${nowM.poster_path}`)" alt="" 
            loading="lazy"
            class="img">
          </div>
          <h4>{{ nowM.title }}</h4>
          <p>{{ nowM.release_date }}</p>
        </router-link>
      </div>
      <div class="d-flex justify-content-center mb-4 mt-3">
        <div class="arrowIcon" @click="nprevPage">
          <img src="@/assets/img/prev_btn.png" alt="" />
        </div>
        <div class="arrowIcon" @click="nnextPage">
          <img src="@/assets/img/next_btn.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <MyFooter/>
</template>

<script setup>
import { onMounted } from "vue";
// import axios from "axios";
import { useStore } from "vuex";
const store = useStore();
import { mapState, mapActions } from "../map-state";
import MyFooter from '../components/MyFooter.vue';
const { nowMovies } = mapState();
const { nnextPage, nprevPage } = mapActions();
// let page = store.state.currentPage;
// console.log(page);
onMounted(() => {
  store.dispatch("loadingNowmovies");
});
</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>
