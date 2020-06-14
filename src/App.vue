<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.wrap-loading{
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255,255,255,0.8);
}
button{
  border: none;
  background: none;
}
html,body{
  width: 100%;
  height: 100%;
}
body{
  margin: 0 auto;
  max-width: 680px;
  padding: 0 15px;
}
*{
  box-sizing: border-box;
}
</style>
