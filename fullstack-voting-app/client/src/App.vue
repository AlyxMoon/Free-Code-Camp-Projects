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
  width: 16.66%;
}
.col-3 {
  width: 25%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.33;
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

</style>
