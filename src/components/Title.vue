<template>
  <h2 class="highlight-text">{{msg}}</h2>
</template>

<script>
export default {
  name: 'Title',
  props: {
    msg: String
  }
}
</script>
<style scoped>
h2 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
