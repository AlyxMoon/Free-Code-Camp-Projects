<template>
  <div id="app">
    <component-navbar></component-navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    'component-navbar': Navbar
  }
}

window.twttr = (function (d, s, id) {
  let js = d.getElementsByTagName(s)[0]
  let fjs = d.getElementsByTagName(s)[0]
  let t = window.twttr || {}
  if (d.getElementById(id)) return t
  js = d.createElement(s)
  js.id = id
  js.src = 'https://platform.twitter.com/widgets.js'
  fjs.parentNode.insertBefore(js, fjs)

  t._e = []
  t.ready = function (f) {
    t._e.push(f)
  }
  return t
}(document, 'script', 'twitter-wjs'))

let styleFontAwesome = document.createElement('link')
styleFontAwesome.setAttribute('rel', 'stylesheet')
styleFontAwesome.setAttribute('integrity', 'sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1')
styleFontAwesome.setAttribute('crossorigin', 'anonymous')
styleFontAwesome.href = 'https://use.fontawesome.com/releases/v5.0.9/css/all.css'
document.head.appendChild(styleFontAwesome)
</script>

<style lang="scss">
$primary-color: #3FB0AC;
$secondary-color: #1C2C35;
$secondary-button-color: rgba(0, 0, 0, 0.9);
$pollNameBackground: rgb(50, 50, 50);

body {
  background-color: $secondary-color;
  margin: 0
}

h1 {
  text-align: center;
}

.container {
  background-color: #E8E9EA;
  border-radius: 8px;
  box-shadow: 8px 8px 2px 0 #CCC;
  margin: 10px auto;
  min-height: 100px;
  padding: 0 1% 10px 1%;
  width: 100%;

  @media (min-width: 768px) {
    width: 85%;
  }

  .row {
    border-bottom: 1px solid black;
    font-size: 0;
    margin-bottom: 5px;
    padding: 5px 5px;

    * {
      display: inline-block;
      font-size: 18px;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
  }
}

div[class^="col-"] {
  display: inline-block;
}

.col-2 {
  width: 16.66%;
}
.col-3 {
  width: 25%;
}
.col-4 {
  width: 33%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.33%;
}
.col-9 {
  width: 75%;
}
.col-10 {
  width: 83.33%;
}
.col-12 {
  width: 100%;
}

span[class^="voting-"] {
  border-radius: 3px;
  color: #E8E9EA;
  margin: auto;
  padding: 0 5px;
  text-align: center;
  width: 90%;
}

.voting-open {
  background-color: #090;
}
.voting-finished {
  background-color: #900;
}

.icon {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.icon-delete {
  color: red;
  cursor: pointer;

  &:before {
    content: 'X';
  }
}

i.fa-spinner {
  color: #3FB0AC;
  font-size: 48px;
  text-align: center;
  width: 100%;
}

.avatar {
  height: auto;
  width: 100%;
}

.btn {
  align-items: center;
  background-color: $primary-color;
  border: 1px solid $secondary-button-color;
  border-radius: 3px;
  box-shadow: 1px 1px 0 0 $secondary-button-color;
  box-sizing: border-box;
  color: $secondary-button-color;
  cursor: pointer;
  display: inline-flex;
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  line-height: 16px;
  margin: 10px auto;
  padding: 1px 6px;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.2s;
  vertical-align: middle;
  user-select: none;

  &:hover {
    background-color: $secondary-button-color;
    border-color: $primary-color;
    color: $primary-color;
  }
}

.poll-name {
  background: $pollNameBackground;
  border-radius: 5px;
  color: white;
  float: right;
  margin: 1%;
  padding: 5px 3%;
  position: relative;
  width: 90%;

  &:before {
    background-color: $pollNameBackground;
    content: " ";
    height: 10px;
    left: -5px;
    position: absolute;
    top: 10px;
    transform: rotate(45deg);
    width: 10px;
  }
}

</style>
