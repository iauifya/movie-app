<template>
  <div class="container mt-5 mb-4">
    <div class="form-group mb-5">
      <input
        type="text"
        v-model.trim="search"
        class="form-control"
        placeholder="最近對哪部電影有興趣呢"
      />
      <router-link :to="`/result/${search}`">
        <img
          @click="searchMovies(search)"
          src="@/assets/img/searchicon.png"
          alt=""
        />
      </router-link>
    </div>
    <hr />
    <div class="titleCon">
      <h3 class="mainTitle">現正熱播</h3>
      <router-link to="/nowlist">
        <h4 class="p">查看更多</h4>
      </router-link>
    </div>
    <div class="outer-row">
      <div class="inner-row">
        <div class="card main" v-for="nowM in nowMovies" :key="nowM.id">
          <router-link :to="`/movieinfo/${nowM.id}`" class="h-100">
            <div
              class="img"
              :style="{
                backgroundImage: `url(https://www.themoviedb.org/t/p/original/${nowM.poster_path})`
              }"
            ></div>
            <h4>{{ nowM.title }}</h4>
            <p>{{ nowM.release_date }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <hr />
    <div class="titleCon">
      <h3 class="mainTitle">即將上映</h3>
      <router-link to="/cominglist">
        <h4 class="p">查看更多</h4>
      </router-link>
    </div>
    <div class="outer-row">
      <div class="inner-row">
        <div
          class="card main"
          v-for="comingM in comingMovies"
          :key="comingM.id"
        >
          <router-link :to="`/movieinfo/${comingM.id}`" class="h-100">
            <div
              class="img"
              :style="{
                backgroundImage: `url(https://www.themoviedb.org/t/p/original/${comingM.poster_path})`
              }"
            ></div>
            <h4>{{ comingM.title }}</h4>
            <p>{{ comingM.release_date }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <h3 class="mainTitle">今日推薦</h3>
      <div class="card today">
        <div v-for="(item, key, index) of voteHighest" :key="index">
          <h3>{{ key === "title" ? item : "" }}</h3>
          <p>{{ key === "release_date" ? item : "" }}</p>
          <p class="overview tBrief">{{ key === "overview" ? item : "" }}</p>
        </div>
      </div>
    </div>
    <hr />
    <div class="titleCon">
      <h3 class="mainTitle">熱門影片</h3>
      <router-link to="/popularlist">
        <h4 class="p">查看更多</h4>
      </router-link>
    </div>
    <div class="outer-row">
      <div class="inner-row">
        <div
          class="card main"
          v-for="popularM in popularMovies"
          :key="popularM.id"
        >
          <router-link :to="`/movieinfo/${popularM.id}`" class="h-100">
            <div
              class="img"
              :style="{
                backgroundImage: `url(https://www.themoviedb.org/t/p/original/${popularM.poster_path})`
              }"
            ></div>
            <h4>{{ popularM.title }}</h4>
            <p>{{ popularM.release_date }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <MyFooter/>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import { computed } from "vue";
// import axios from "axios";
import { mapActions, mapState, mapGetters } from "../map-state";
import { useStore } from "vuex";
import MyFooter from '../components/MyFooter.vue';
const store = useStore();

const search = ref("");

const { searchMovies } = mapActions();
// 從vuex取出nowMovies、comingMovies、latestMovie、popularMovies資料
const { nowMovies, comingMovies, popularMovies } = mapState(); //陣列適合用此方式
const { voteHighest } = mapGetters();

// let newVote =  JSON.parse(JSON.stringify(voteHighests));
// watch(
//   () => voteHighest,
//   (newV, oldV) => {
//     console.log(newV.value.id, oldV.value.id);
//     // console.log(newV.value.id, oldV.value.id);
//   },
//   {
//     // immediate: true,
//     deep: true
//   }
// );
// todayMovie.id = voteHighest.value.id; //這個東西重整後就會變成undefined
// console.log(store.getters.voteHighest);

onMounted(() => {
  store.dispatch("loadingNowmovies");
  store.dispatch("loadingComingmovies");
  // store.dispatch("searchMovies");
  store.dispatch("loadingPopularmovies");
  if (JSON.stringify(store.state.movies) == "[]") {
    store.dispatch("searchMovies");
  }
});
// onMounted((data) => {
//   store.commit('SEARCH_MOVIES',data);
// });
// const testSearch = () => {
//   axios
//     .get(
//       "https://api.themoviedb.org/3/movie/upcoming?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW&page=1&region=TW")
//     .then(res => {
//       console.log(res.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
// const movieSearch = () => {
//   if (search.value !== "") {
//     // axios
//     //   .get(
//     //     `https://api.themoviedb.org/3/search/movie?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW&year=2022&query=${search.value}&page=1&include_adult=false`
//     //   )
//     //   .then(res => {
//     //     console.log(res.data);
//     //     movies.value = res.data.results;
//     //     search.value = "";
//     //     console.log(movies.value);
//     //     // window.location.href = `/search/${search}`
//     //   })
//     //   .catch(err => {
//     //     console.log(err);
//     //   });
//     // fetch(`https://www.omdbapi.com/?apikey=8610b7b2&s=${search.value}`)
//     //   .then(res => res.json())
//     //   .then(data =>{
//     //     console.log(data);
//     //     movies.value = data.Search;
//     //     search.value = '';
//     //     console.log(movies.value);
//     //   })
//     //   .catch(err => {
//     //     console.log(err);
//     //   });
//   }
// };
</script>
<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/movie.css" scoped></style>
