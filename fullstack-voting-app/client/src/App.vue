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

h1 {
  text-align: center;
}

.container {
  background-color: #F4F7F6;
  margin: auto;
  padding: 0 1% 10px 1%;
  min-height: 100px;
  width: 100%;

  @media (min-width: 768px) {
    width: 85%;
  }

  .row {
    border-bottom: 1px solid black;
    cursor: pointer;
    font-size: 0;
    padding: 5px 5px;

    &:hover {
      background: #D5E4DF;
    }

    * {
      display: inline-block;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: bottom;
    }
  }
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

span[class^="voting-"] {
  color: white;
  margin: auto;
  padding: 0 5px;
  text-align: center;
  width: 90%;
}

.voting-open {
  background-color: #218838;
}
.voting-finished {
  background-color: #C82333;
}

</style>
