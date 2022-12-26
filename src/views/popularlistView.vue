<template>
  <div class="container mt-4">
    <div class="row">
      <h3 class="mainTitle">熱門選擇影片列表</h3>
      <div class="card main list" v-for="popularM in popularMovies" :key="popularM.id">
        <div
          class="img"
          :style="{
            backgroundImage: `url(https://www.themoviedb.org/t/p/original/${popularM.poster_path})`
          }"
        ></div>
        <h4>{{ popularM.title }}</h4>
        <p>{{ popularM.release_date }}</p>
      </div>
      <div class="d-flex justify-content-center mb-4 mt-3">
        <div class="arrowIcon" @click="pprevPage"><img src="@/assets/img/prev_btn.png" alt=""></div>
        <div class="arrowIcon" @click="pnextPage"><img src="@/assets/img/next_btn.png" alt=""></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
// import axios from "axios";
import { useStore } from "vuex";
const store = useStore();
import { mapState,mapActions } from "../map-state";
const { popularMovies } = mapState();
const { pnextPage,pprevPage } = mapActions();
onMounted(() => {
  store.dispatch("loadingPopularmovies");
})
</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>