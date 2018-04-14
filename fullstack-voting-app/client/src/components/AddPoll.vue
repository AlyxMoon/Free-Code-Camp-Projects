<template>
  <div class="container" id="add-poll">
    <form @submit.prevent="addPoll">
      <div class="input-group">
        <label for="name">Poll Name</label>
        <input type="text" name="name" v-model="poll.name" required />
      </div>
      <div class="input-group">
        <label for="finishedAt">Scheduled Finish</label>
        <input
          type="datetime-local"
          name="finishedAtDateTime"
          v-model="finishedAtDateTime"
          required />
      </div>
      <div class="input-group">
        <label>Poll Options</label>
        <template v-for="(option, key) in poll.options">
          <div :key="`div-${key}`" class="input-group">
            <input
              :key="`input-${key}`"
              class="poll-option"
              type="text"
              :name="`option-${key}`"
              v-model="option.name"
              required
            />
            <span
              :key="`icon-${key}`"
              :data-index="key"
              v-on:click="removeOption(key)"
              title="remove"
              class="icon icon-delete"
            ></span>
            <hr />
          </div>
        </template>

      </div>
      <div class="input-group">
        <button class="btn" @click.prevent="addOption">Add Option</button>
        <input class="btn" type="submit" value="Create Poll" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'

import { apiPath } from '../consts.js'

export default {
  name: 'add-poll',
  data () {
    return {
      poll: {
        name: '',
        finishedAt: '',
        createdAt: '',
        options: [{ name: '' }, { name: '' }]
      },
      finishedAtDateTime: moment().add(1, 'day').format('YYYY-MM-DD[T]HH:mm'),
      optionsLimit: 999
    }
  },
  methods: {
    addPoll () {
      let momentDate = moment(this.finishedAtDateTime)
      this.poll.finishedAt = momentDate.toISOString()
      this.poll.createdAt = moment.utc()

      if (this.poll.options.length === 0) {
        alert('You cannot make a poll with no options!')
        return
      }

      axios.post(`${apiPath}/poll/add`, {
        poll: this.poll
      })
        .then(response => {
          if (response.data.error) {
            alert(response.data.error)
          } else {
            this.$router.push(`/poll/${response.data._id}`)
          }
        })
        .catch(error => {
          alert('There was an error creating the poll.')
          console.log(error)
        })
    },
    addOption () {
      if (this.poll.options.length < this.optionsLimit) {
        this.poll.options.push({ name: '' })
      } else {
        alert(`There can only be ${this.optionsLimit} options per poll`)
      }
    },
    removeOption (index) {
      this.poll.options.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 15px 10px;
}

.input-group {
  margin-top: 5px;
}

label {
  display: block;
  font-size: 20px;
  font-weight: bold;
}

input[type="text"], input[type="datetime-local"] {
  border-radius: 5px;
  font-size: 16px;
  height: 25px;
  padding: 0 5px;
  &:focus {
    border-radius: 5px;
  }
}

</style>
