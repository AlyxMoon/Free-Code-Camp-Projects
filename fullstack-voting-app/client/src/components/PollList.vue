<template>
  <div id="poll-list">
    <i class="fa fa-spinner fa-spin" v-show="loading"></i>
    <transition-group
    name="polls"
    tag="div"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave">
      <div
      class="poll-item container"
      v-for="(poll, key) in reversePolls"
      :key="key"
      v-bind:data-index="key">
        <a :href="'/poll/' + poll._id">
          <div class="row">
            <div class="col-2">
              <img class="avatar" :src="poll.creatorAvatar" />
            </div>
            <div class="col-10">
              <span class="poll-name">{{ poll.name }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              <span class="voting-finished" v-if="poll.finished">CLOSED</span>
              <span class="voting-open" v-else>OPEN</span>
            </div>
            <div class="col-3">
              <span class="vote-count">Votes: {{ getVotesCount(key) }}</span>
            </div>
            <div class="col-7">
              <span class="poll-start-date">Asked: {{ getHumanReadableDate(poll.createdAt) }}</span>
            </div>
          </div>
        </a>
      </div>
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
  computed: {
    reversePolls: function () {
      return this.polls.slice().reverse()
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
        this.loading = false
        this.polls = response.data
      }
    }).catch(error => {
      console.log('error getting info from polls api', error)
    })
  },
  methods: {
    getHumanReadableDate: function (timestamp) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let date = new Date(timestamp)

      let year = date.getUTCFullYear()
      let month = months[date.getUTCMonth()]
      let day = date.getUTCDate().toString().padStart(2, '0')
      return `${month} ${day}, ${year}`
    },
    getVotesCount: function (i) {
      return this.polls[i].options.reduce((total, option) => {
        return total + option.votes
      }, 0)
    },
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
$pollNameBackground: rgb(50, 50, 50);

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

.container {
  border-radius: 8px;
  box-shadow: 8px 8px 2px 0 #CCC;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #D5E4DF;
  }
}

.avatar {
  height: auto;
  width: 100%;
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

.vote-count {
  padding-left: 5px;
}

</style>
