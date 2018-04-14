<template>
  <div id="poll" class="container">
    <component-voting :poll="poll" :user="user"></component-voting>
    <component-results :poll="poll"></component-results>
  </div>
</template>

<script>
import axios from 'axios'

import Results from './Results'
import Voting from './Voting'

import { apiPath } from '../consts.js'

export default {
  name: 'Poll',
  components: {
    'component-voting': Voting,
    'component-results': Results
  },
  props: ['poll_id'],
  data () {
    return {
      poll: {},
      user: {}
    }
  },
  created: function () {
    axios.get(`${apiPath}/poll/${this.poll_id}`).then(response => {
      this.poll = response.data
    }).catch(error => {
      console.log('There was an error getting the poll data', error)
    })
    axios.get(`${apiPath}/user`).then(response => {
      this.user = response.data
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-top: 1px;
}
</style>
