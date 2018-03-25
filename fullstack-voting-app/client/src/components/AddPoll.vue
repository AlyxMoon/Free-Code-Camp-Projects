<template>
  <div id="add-poll">
    <form>
      <div class="input-group">
        <label for="name">Poll Name</label>
        <input type="text" name="name" v-model="poll.name" required />
      </div>
      <div class="input-group">
        <label for="finishedAt">Scheduled Finish</label>
        <input type="date" name="finishedAt" v-model="poll.finishedAt" required />
      </div>
      <div class="input-group">
        Poll Options
        <button v-on:click.prevent="addOption">Add</button>
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
          </div>
        </template>

      </div>
      <button v-on:click.prevent="addPoll">Add Poll</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add-poll',
  data () {
    return {
      poll: {
        name: '',
        finishedAt: '',
        options: [{ name: '' }, { name: '' }]

      },
      optionsLimit: 999
    }
  },
  methods: {
    addPoll () {
      axios.post('http://localhost:50031/api/poll/add', {
        poll: this.poll
      })
        .then(response => {
          this.$router.push(`/poll/${response.data._id}`)
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
      console.log(index)
      this.poll.options.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
label, .input-group {
  color: white;
}

.poll-option {
  // display: block;
}

</style>
