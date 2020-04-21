<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import list from './data/all.js';
  import prize from './data/prize.js';
  import index from '@/components/index.vue';

  export default {
    name: 'App',
    components: {
      index
    },
    data() {
      return {
        navs: []
      }
    },
    created() {
      if (window.localStorage) {
        window.localStorage.setItem('prize', JSON.stringify(prize))
        this.navs = JSON.parse(window.localStorage.getItem('prize'));
      }
      if(!window.localStorage.getItem("list")){
        window.localStorage.setItem('list', JSON.stringify(list))
      }
    },
    methods: {}
  }
</script>

<style>
  body {
    font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    background: url(./assets/main-page-bg.jpg) no-repeat fixed center center;
    background-size: cover;
    background-color: #f71b1b;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
