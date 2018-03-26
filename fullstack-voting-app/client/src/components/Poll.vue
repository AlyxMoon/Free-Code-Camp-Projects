<template>
  <div id="poll" class="container">
    <component-voting :poll="poll"></component-voting>
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
      poll: {}
    }
  },
  created: function () {
    axios.get(`http://localhost:50031/api/poll/${this.poll_id}`).then(response => {
      this.poll = response.data
      console.log(JSON.stringify(this.poll))
    }).catch(error => {
      console.log('There was an error getting the poll data', error)
    })
  }
}
</script>

<style scoped lang="scss">

</style>
