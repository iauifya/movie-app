<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<script setup>
// import { onMounted } from "vue";
// import { useStore } from "vuex";
// const store = useStore();

// onMounted(() => {
//   //在页面加载时读取sessionStorage里的状态信息
//   if (sessionStorage.getItem("store") ) {
//       store.replaceState(Object.assign({}, store.state,JSON.parse(sessionStorage.getItem("store"))))
//   } 

//   //在页面刷新时将vuex里的信息保存到sessionStorage里
//   window.addEventListener("beforeunload",()=>{
//       sessionStorage.setItem("store",JSON.stringify(store.state))
//   })

// })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body{
  min-height: 100vh;
  background-color: #042a34 !important;
}
</style>
