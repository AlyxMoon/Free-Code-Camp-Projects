<template>
  <div id="poll-list">
    <div class="container subtle">
      <input
        type="checkbox"
        name="onlyOpenPolls"
        @click="togglePollsDisplay" />
      <label for="onlyOpenPolls">Only show open polls</label>
    </div>
    <transition-group
    name="polls"
    tag="div"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter" >
      <div
      class="poll-item container hoverable"
      v-for="(poll, key) in polls"
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
        <div class="row" v-if="onlyUserPolls">
          <component-results :poll="poll" :alwaysShow="false"></component-results>
        </div>
      </div>
    </transition-group>
    <i class="fa fa-spinner fa-spin" v-show="loading"></i>
    <button v-show="!loading" class="btn see-more-button" v-on:click="getMorePolls">See More</button>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

import Results from './Results'

export default {
  name: 'PollList',
  components: {
    'component-results': Results
  },
  props: ['onlyUserPolls'],
  data () {
    return {
      loading: false,
      onlyOpenPolls: false,
      polls: []
    }
  },
  created () {
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
      return moment.utc(timestamp).local().format('YYYY-MM-DD HH:mm')
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
    getMorePolls: function () {
      this.loading = true

      let baseRoute = 'http://localhost:50031/api'
      let apiRoute = this.onlyUserPolls ? 'myPolls' : 'polls'
      let options = `currentPollCount=${this.polls.length}&onlyOpenPolls=${this.onlyOpenPolls}`

      axios.get(`${baseRoute}/${apiRoute}?${options}`).then(response => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          this.loading = false
          this.polls = this.polls.concat(response.data)
        }
      }).catch(error => {
        console.log('error getting info from polls api', error)
      })
    },
    togglePollsDisplay: function () {
      this.onlyOpenPolls = !this.onlyOpenPolls
      this.polls.splice(0, this.polls.length)
      this.getMorePolls()
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

input {
  height: 20px;
  vertical-align: middle;
  width: 20px;
}
label {
  color: #E8E9EA;
  vertical-align: middle;
}

.see-more-button {
  display: block;
  height: 30px;
  width: 100px;
}

.vote-count {
  padding-left: 5px;
}

</style>
