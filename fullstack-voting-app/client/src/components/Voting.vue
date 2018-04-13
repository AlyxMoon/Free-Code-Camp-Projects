<template>
  <div id="voting">
    <div class="row">
      <div class="poll-avatar col-2">
        <img class="avatar" :src="poll.creatorAvatar" />
        <button
          class="btn delete"
          v-on:click="deletePoll" >
          Delete
        </button>
      </div>
      <div class="poll-info col-10">
        <span class="poll-name">{{ poll.name }}</span>
        <h4 class="creatorName">Creator: {{ poll.creatorName }}</h4>
        <h4>Started On: {{ startDate }}</h4>
        <h4>Finishing On: {{ pollCloseDateTime }}</h4>
        <span class="voting-finished" v-if="poll.finished">CLOSED</span>
        <span class="voting-open" v-else>OPEN</span>
      </div>
    </div>

    <div v-for="(option, key) in poll.options" :key="key">
      <input type="radio" name="vote" :value="key" v-model="currentVote" />
      <label :for="key">{{ option.name }}</label>
      <sup class="hasVoted" v-if="hasVotedFor(key)">Voted on this option</sup>
      <hr />
    </div>
    <div v-if="user.userId">
      <span class="new-option-label">Add Your Own Option</span>
      <input type="radio" name="vote" :value="poll.options.length" v-model="currentVote" />
      <input type="text" v-model="newOption" />
    </div>
    <button class="btn" v-on:click="vote">Vote</button>
    <a class="btn" target="_blank" :href="`https://twitter.com/intent/tweet?text=${tweetText}`">
      <i class="fab fa-twitter"></i>Share
    </a>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'
export default {
  name: 'voting',
  props: ['poll', 'user'],
  data () {
    return {
      currentVote: '',
      newOption: ''
    }
  },
  computed: {
    startDate: function () {
      return moment.utc(this.poll.createdAt).local().format('YYYY-MM-DD HH:mm')
    },
    tweetText: function () {
      return `Check out my poll: ${this.poll.name} ${window.location.href}`
    },
    pollCloseDateTime: function () {
      return moment.utc(this.poll.finishedAt).local().format('YYYY-MM-DD HH:mm')
    }
  },
  methods: {
    vote: function () {
      if (this.currentVote === '') {
        alert('No option was selected!')
      } else if (this.currentVote === this.poll.options.length) {
        this.addOption()
      } else {
        axios.get(`http://localhost:50031/api/vote/${this.poll._id}/${this.currentVote}`).then(response => {
          if (response.data.error) {
            alert(response.data.error)
          } else {
            window.location.reload()
          }
        }).catch(error => {
          alert(error)
        })
      }
    },
    addOption: function () {
      if (this.newOption === '') {
        alert('You forgot to add a name to the new option!')
      } else {
        axios.get(`http://localhost:50031/api/options/${this.poll._id}/${this.newOption}`).then(response => {
          if (response.data.error) {
            alert(response.data.error)
          } else {
            window.location.reload()
          }
        }).catch(error => {
          alert(error)
        })
      }
    },
    deletePoll: function () {
      if (confirm('Are you sure you want to delete this poll?')) {
        axios.get(`http://localhost:50031/api/poll/${this.poll._id}/delete`).then(response => {
          alert('Poll deleted successfully.')
          this.$router.push(`/`)
        }).catch(error => {
          alert(error)
        })
      }
    },
    hasVoted: function () {
      if (!this.user || !this.poll) return false
      return (this.user.userId in this.poll.userVotes)
    },
    hasVotedFor: function (option) {
      if (!this.hasVoted()) return false
      return parseInt(this.poll.userVotes[this.user.userId].vote) === option
    }
  }
}
</script>

<style scoped lang="scss">

h1 {
  text-align: left;
}
h4 {
  margin: 0;
}

input[type="radio"] {
  height: 18px;
  vertical-align: bottom;
  width: 18px;
}

label {
  font-size: 18px;
  line-height: 18px;
  vertical-align: middle;
}

.btn {
  height: 4vh;
  width: 20vh;

  i {
    padding-right: 5px;
  }
}

.btn.delete {
  width: 100%;
  background-color: #900;

  &:hover {
    background-color: #B20000;
    color: white;
    border-color: black;

  }
}

.new-option-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 30px;
}

.poll-avatar {
  vertical-align: top;
}

.poll-info {
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  * {
    padding-left: 10px;
  }
}

.poll-name {
  margin-left: 10px;
}

span[class^="voting-"] {
  margin-left: 10px;
  padding: 0 10px;
  text-align: left;
  width: auto;
}

.hasVoted {
  font-weight: bold;
}

</style>
