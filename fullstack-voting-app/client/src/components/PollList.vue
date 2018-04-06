<template>
  <div id="poll-list" class="container">
    <h1>The Polls</h1>
    <hr />
    <i class="fa fa-spinner fa-spin" v-show="loading"></i>
    <transition-group
    name="polls"
    tag="ul"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave">
      <li
      class="poll-item"
      v-for="(poll, key) in polls"
      :key="key"
      v-bind:data-index="key">
        <a :href="'/poll/' + poll._id">
          <div class="row">
            <span class="poll-voting col-2">
              <span class="voting-finished" v-if="poll.finished">CLOSED</span>
              <span class="voting-open" v-else>OPEN</span>
            </span>
            <span class="poll-name col-7">
              {{ poll.name }}
            </span>
            <span class="poll-avatar col-3">
              <img class="avatar" :src="poll.creatorAvatar" />
            </span>
          </div>
        </a>
      </li>
    </transition-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PollList',
  props: ['onlyUserPolls'],
  data () {
    return {
      loading: false,
      polls: []
    }
  },
  created: function () {
    this.loading = true

    let baseRoute = 'http://localhost:50031/api'
    let apiRoute = this.onlyUserPolls ? 'myPolls' : 'polls'
    axios.get(`${baseRoute}/${apiRoute}`).then(response => {
      if (response.data.error) {
        alert(response.data.error)
      } else {
        console.log(JSON.stringify(response.data))
        this.loading = false
        this.polls = response.data
      }
    }).catch(error => {
      console.log('error getting info from polls api', error)
    })
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      setTimeout(() => {
        el.style.opacity = 1
        el.style.height = 'auto'
        el.style.transition = 'opacity 0.5s'
      }, el.dataset.index * 60)
    },
    leave: function (el, done) {
      setTimeout(() => {
        el.style.opacity = 0
        el.style.height = 0
        el.style.transition = 'opacity 0.5s'
      }, el.dataset.index * 60)
    }
  }
}
</script>

<style scoped lang="scss">
a {
  color: black;
  text-decoration: none;
}

h1 {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

.avatar {
  width: 100%;
  height: auto;
}

.poll-voting, .poll-name, .poll-avatar {
  vertical-align: top;
}

</style>
