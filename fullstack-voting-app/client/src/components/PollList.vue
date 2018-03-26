<template>
  <div id="poll-list" class="container">
    <h1>The Polls</h1>
    <hr />
    <a :href="'/poll/' + poll._id" v-for="(poll, key) in polls" :key="key">
      <div class="row">
        <span class="poll-voting col-2">
          <span class="voting-finished" v-if="poll.finished">CLOSED</span>
          <span class="voting-open" v-else>OPEN</span>
        </span>
        <span class="poll-creator col-3" :title="poll.creator">
          {{ poll.creator }}
        </span>
        <span class="poll-name col-7">
          | {{ poll.name }}
        </span>
      </div>
    </a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PollList',
  data () {
    return {
      polls: []
    }
  },
  created: function () {
    axios.get('http://localhost:50031/api/polls').then(response => {
      this.polls = response.data
    }).catch(error => {
      console.log('error getting info from polls api', error)
    })
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

</style>
