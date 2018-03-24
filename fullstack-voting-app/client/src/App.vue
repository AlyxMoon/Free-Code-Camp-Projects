<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  background-color: #1C2C35;
}

div[class^="col-"] {
  display: inline-block;
}

.col-2 {
  width: 16.66%
}
.col-3 {
  width: 25%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.33
}
.col-9 {
  width: 75%;
}

</style>
