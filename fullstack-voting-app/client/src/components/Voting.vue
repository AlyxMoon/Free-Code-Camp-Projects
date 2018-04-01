<template>
  <div id="voting">
    <h1>{{ poll.name }}</h1>
    <a target="_blank" :href="`https://twitter.com/intent/tweet?text=${tweetText}`">Tweet</a>
    <h3>Creator: {{ poll.creatorName }}</h3>
    <h4>Started On: {{ poll.createdAt }}</h4>
    <h4>
      Finishing On: {{ poll.finishedAt }}
      <span class="voting-finished" v-if="poll.finished">CLOSED</span>
      <span class="voting-open" v-else>OPEN</span>
    </h4>
    <hr />
    <div v-for="(option, key) in poll.options" :key="key">
      <input type="radio" name="vote" :value="key" v-model="currentVote" />
      <label :for="key">{{ option.name }}</label>
    </div>
    <button v-on:click="vote">Vote</button>
    <div class="input-group">
      <button v-on:click="addOption">Add Option and Vote</button>
      <input type="text" v-model="newOption" />
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'voting',
  props: ['poll'],
  data () {
    return {
      currentVote: '',
      newOption: ''
    }
  },
  computed: {
    tweetText: function () {
      return `Check out my poll: ${this.poll.name} ${window.location.href}`
    }
  },
  methods: {
    vote: function () {
      if (this.currentVote === '') {
        alert('No option was selected!')
      } else {
        axios.get(`http://localhost:50031/api/vote/${this.poll._id}/${this.currentVote}`).then(response => {
          if (response.data.error) {
            console.log('error on correct return?', response.data.error)
            alert('There was a problem registering your vote. Try again!')
          } else {
            window.location.reload()
          }
        }).catch(error => {
          console.log(error)
          alert('There was a problem registering your vote. Try again!')
        })
      }
    },
    addOption: function () {
      if (this.newOption === '') {
        alert('You forgot to add a name to the new option!')
      } else {
        axios.get(`http://localhost:50031/api/options/${this.poll._id}/${this.newOption}`).then(response => {
          if (response.data.error) {
            console.log('error on correct return?', response.data.error)
            alert('There was a problem registering your new option. Try again!')
          } else {
            window.location.reload()
          }
        }).catch(error => {
          console.log(error)
          alert('There was a problem registering your new option. Try again!')
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">

h4 {
  margin: 0;
}

input[type="radio"] {
  height: 18px;
  margin-bottom: 18px;
  vertical-align: top;
  width: 18px;
}

label {
  font-size: 18px;
  line-height: 18px;
  vertical-align: middle;
}

button {
  background-color: #3FB0AC;
  border: 1px solid black;
  color: white;
  cursor: pointer;
  height: 4vh;
  margin-top: 10px;
  width: 20vh;

  &:hover {
    opacity: 0.9;
  }
}

</style>
