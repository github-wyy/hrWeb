<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <!-- 保持组件的长期有效，避免因为组件切换所导致的频繁刷新，从而出现的数据内容的不正确 -->
      <keep-alive><router-view/></keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {}
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
