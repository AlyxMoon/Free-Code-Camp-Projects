<template>
  <div id="poll" class="container">
    <component-voting :poll="poll" :user="user"></component-voting>
    <hr />
    <component-results :poll="poll"></component-results>
  </div>
</template>

<script>
import axios from 'axios'

import Results from './Results'
import Voting from './Voting'

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
    axios.get(`http://localhost:50031/api/poll/${this.poll_id}`).then(response => {
      this.poll = response.data
    }).catch(error => {
      console.log('There was an error getting the poll data', error)
    })
    axios.get('http://localhost:50031/api/user').then(response => {
      this.user = response.data
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped lang="scss">

</style>
