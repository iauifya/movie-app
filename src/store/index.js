import { createStore } from "vuex";
// import { watch } from "vue";
import axios from "axios";

const LS ={
  load(){
    return JSON.parse(localStorage.getItem('vue-moviesearch') || '[]') //讀資料，也要考慮有可能讀不到的情況|| '[]'   用JSON.parse()把陣列轉成字串
  },
  save(data){
    localStorage.setItem('vue-moviesearch',JSON.stringify(data)) //(存在哪裡,存什麼資料)
  }
}
// let currentPage = state.scurrentPage;
export default createStore({
  strict: true,
  state: {
    movies: [],
    nowMovies: [],
    comingMovies: [],
    // latestMovie: {},
    popularMovies: [],
    stotal_pages:'',
    currentPage: 1,
    ntotal_pages:'',
    ncurrentPage: 1,
    ctotal_pages:'',
    ccurrentPage: 1,
    ptotal_pages:'',
    pcurrentPage: 1,
  },
  getters: {
    voteHighest(state){
      let max = Math.max(...state.popularMovies.map(p => p.vote_count));
      let voteHighests = state.popularMovies.find(p => p.vote_count === max);
      // console.log(voteHighests);
      return voteHighests//成功!!!! 
    }
    // todayTitle(state,getters){
    //   state.todayMovie.title = getters.voteHighest.title;
    //   return state.todayMovie.title;
    // },
  },
  mutations: {
    SEARCH_MOVIES(state, data) {
      state.movies = data.results;
      state.stotal_pages = data.total_pages;
      state.currentPage = data.page;
      LS.save(state.movies);
      LS.save(state.stotal_pages);
      LS.save(state.currentPage);
    },
    LOADING_NOWMOVIES(state, data) {
      state.nowMovies = data.results;
      state.ntotal_pages = data.total_pages;
      LS.save(state.nowMovies);
      LS.save(state.ntotal_pages);
    },
    LOADING_COMINGMOVIES(state, data) {
      state.comingMovies = data.results;
      state.ctotal_pages = data.total_pages;
      LS.save(state.comingMovies);
      LS.save(state.ctotal_pages);
    },
    // LOADING_LATESTMOVIE(state, data) {
    //   state.latestMovie = data;
    // },
    LOADING_POPULARMOVIES(state, data) {
      state.popularMovies = data.results;
      state.ptotal_pages = data.total_pages;
      LS.save(state.ptotal_pages);
      LS.save(state.popularMovies);
    },
    NEXT_PAGE(state){
      if(state.currentPage > state.stotal_pages) return; //如果這個條件成立就中止函式
      state.currentPage++;
      console.log(state.currentPage);
      // console.log(state.movies);
    },
    NNEXT_PAGE(state){
      
      state.ncurrentPage++;
      console.log(state.ncurrentPage);
    },
    NPREV_PAGE(state){
      
      state.ncurrentPage--;
      console.log(state.ncurrentPage);
    },
    CNEXT_PAGE(state){
      state.ccurrentPage++;
      console.log(state.ccurrentPage);
    },
    CPREV_PAGE(state){
      
      state.ccurrentPage--;
      console.log(state.ccurrentPage);
    },
    PNEXT_PAGE(state){
      state.pcurrentPage++;
      console.log(state.pcurrentPage);
    },
    PPREV_PAGE(state){
      state.pcurrentPage--;
      console.log(state.pcurrentPage);
    }
  },
  actions: {
    searchMovies({ commit,state },query) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW&year=2022&query=${query}&page=${state.currentPage}&include_adult=false`
        )
        .then(res => {
          console.log("vuex_movieSearch", { data: res.data });
          commit("SEARCH_MOVIES", res.data);
          LS.load();
        })
        .catch(err => console.dir(err));
    },
    nextPage({commit,dispatch,state}){
      if(state.currentPage > state.stotal_pages) return; //如果這個條件成立就中止函式
      // currentPage = state.scurrentPage; //不能在mutation以外的地方去修改state的資料，所以要複製一個新的資料出來
      // console.log(currentPage); 
      commit('NEXT_PAGE'); //呼叫mutations的函式
      dispatch("searchMovies"); //呼叫此函式
    },
    loadingNowmovies({ commit,state }) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW&page=${state.ncurrentPage}&region=TW`
        )
        .then(res => {
          console.log("vuex_nowMovies", { data: res.data },res.data.total_pages);
          commit("LOADING_NOWMOVIES", res.data);
          LS.load();
        })
        .catch(err => console.dir(err));
    },
    nnextPage({commit,dispatch,state}){
      if(state.ncurrentPage > state.ntotal_pages) return; //如果這個條件成立就中止函式
      // currentPage = state.scurrentPage; //不能在mutation以外的地方去修改state的資料，所以要複製一個新的資料出來
      commit('NNEXT_PAGE'); //呼叫mutations的函式
      dispatch("loadingNowmovies"); //呼叫此函式
      
    },
    nprevPage({commit,dispatch,state}){
      if(state.ncurrentPage === 1) return; //如果這個條件成立就中止函式
      // currentPage = state.scurrentPage; //不能在mutation以外的地方去修改state的資料，所以要複製一個新的資料出來
      commit('NPREV_PAGE'); //呼叫mutations的函式
      dispatch("loadingNowmovies"); //呼叫此函式
    },

    loadingComingmovies({ commit,state }) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW&page=${state.ccurrentPage}&region=TW`
        )
        .then(res => {
          console.log("vuex_comingMovies", { data: res.data },res.data.total_pages);
          commit("LOADING_COMINGMOVIES", res.data);
          LS.load();
        })
        .catch(err => console.dir(err));
    },
    cnextPage({commit,dispatch,state}){
      if(state.ccurrentPage > state.ctotal_pages) return; //如果這個條件成立就中止函式
      // currentPage = state.scurrentPage; //不能在mutation以外的地方去修改state的資料，所以要複製一個新的資料出來
      commit('CNEXT_PAGE'); //呼叫mutations的函式
      dispatch("loadingComingmovies"); //呼叫此函式
      
    },
    cprevPage({commit,dispatch,state}){
      if(state.ccurrentPage === 1) return; //如果這個條件成立就中止函式
      // currentPage = state.scurrentPage; //不能在mutation以外的地方去修改state的資料，所以要複製一個新的資料出來
      commit('CPREV_PAGE'); //呼叫mutations的函式
      dispatch("loadingComingmovies"); //呼叫此函式
    },
    // loadingLatestmovie({ commit }) {
    //   axios
    //     .get(
    //       "https://api.themoviedb.org/3/movie/latest?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW"
    //     )
    //     .then(res => {
    //       console.log("vuex_lastestMovie", { data: res.data });
    //       commit("LOADING_LATESTMOVIE", res.data);
    //     })
    //     .catch(err => console.dir(err));
    // },
    loadingPopularmovies({ commit,state }) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=e10d0d0ccc7102e9244008e94dc983c7&year=2022&language=zh-TW&page=${state.pcurrentPage}&region=TW`
        )
        .then(res => {
          console.log("vuex_popularMovies", { data: res.data },res.data.total_pages);
          commit("LOADING_POPULARMOVIES", res.data);
          LS.load();
        })
        .catch(err => console.dir(err));
    },
    pnextPage({commit,dispatch,state}){
      if(state.pcurrentPage > state.ptotal_pages) return; //如果這個條件成立就中止函式
      // currentPage = state.scurrentPage; //不能在mutation以外的地方去修改state的資料，所以要複製一個新的資料出來
      commit('PNEXT_PAGE'); //呼叫mutations的函式
      dispatch("loadingPopularmovies"); //呼叫此函式
      
    },
    pprevPage({commit,dispatch,state}){
      if(state.pcurrentPage === 1) return; //如果這個條件成立就中止函式
      // currentPage = state.scurrentPage; //不能在mutation以外的地方去修改state的資料，所以要複製一個新的資料出來
      commit('PPREV_PAGE'); //呼叫mutations的函式
      dispatch("loadingPopularmovies"); //呼叫此函式
    },

    // getmovieId({commit}){
    //   axios
    //     .get(
    //       `https://api.themoviedb.org/3/movie/${id}?api_key=e10d0d0ccc7102e9244008e94dc983c7&language=zh-TW`
    //     )
    //     .then(res => {
    //       console.log("vuex_comingMovies", { data: res.data },res.data.total_pages);
    //       commit("LOADING_COMINGMOVIES", res.data);
    //       LS.load();
    //     })
    //     .catch(err => console.dir(err));
    // }
  },
  modules: {}
});
