<template>
  <div class="container my-4">
    <div class="row">
      <h3 class="mainTitle">即將上映影片列表</h3>
      <div
        class="card main list"
        v-for="comingM in comingMovies"
        :key="comingM.id"
      >
        <router-link :to="`/movieinfo/${comingM.id}`" class="h-100">
          <div>
            <img :src="(`https://www.themoviedb.org/t/p/original/${comingM.poster_path}`)" alt="" 
            loading="lazy"
            class="img">
          </div>
          <h4>{{ comingM.title }}</h4>
          <p>{{ comingM.release_date }}</p>
        </router-link>
      </div>
      <div class="d-flex justify-content-center mb-4 mt-3">
        <div class="arrowIcon" @click="cprevPage">
          <img src="@/assets/img/prev_btn.png" alt="" />
        </div>
        <div class="arrowIcon" @click="cnextPage">
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
const { comingMovies } = mapState();
const { cnextPage, cprevPage } = mapActions();
onMounted(() => {
  store.dispatch("loadingComingmovies");
});
</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>
