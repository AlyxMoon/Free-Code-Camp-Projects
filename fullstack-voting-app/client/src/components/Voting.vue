<template>
  <div id="voting">
    <h1>{{ poll.name }}</h1>
    <h3>Creator: {{ poll.creator }}</h3>
    <h4>Started On: {{ poll.createdAt }}</h4>
    <h4>
      Finishing On: {{ poll.finishedAt }}
      <span class="voting-finished" v-if="poll.finished">CLOSED</span>
      <span class="voting-open" v-else>OPEN</span>
    </h4>
    <hr />
    <div v-for="(option, key) in poll.options" :key="key">
      <input type="radio" name="vote" :value="key" />
      <label :for="key">{{ option.name }}</label>
    </div>
    <button>Vote</button>
  </div>
</template>

<script>
export default {
  name: 'voting',
  data () {
    return {
      poll: {
        _id: 1,
        name: 'Are things working?',
        creator: 'AlyxDeLunar',
        createdAt: '2018-03-21',
        finishedAt: '2018-05-30',
        finished: false,
        options: [{
          name: 'yes',
          votes: 1
        }, {
          name: 'no',
          votes: 0
        }, {
          name: 'no1',
          votes: 0
        }, {
          name: 'no2',
          votes: 0
        }, {
          name: 'no3',
          votes: 0
        }, {
          name: 'no4',
          votes: 0
        }, {
          name: 'no5',
          votes: 0
        }, {
          name: 'no6',
          votes: 0
        }]
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
