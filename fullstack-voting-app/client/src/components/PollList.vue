<template>
  <div id="poll-list">
    <div class="panel">
      <ul class="polls">
        <li v-for="(poll, key) in polls" :key="key">
          {{ poll.name }} | {{ poll.creator }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PollList',
  data () {
    return {
      polls: [{
        name: 'Are things working?',
        creator: 'AlyxDeLunar',
        createdAt: '2018-03-21',
        finishedAt: '',
        finished: false,
        options: [{
          name: 'yes',
          votes: 1
        }, {
          name: 'no',
          votes: 0
        }]
      }, {
        name: 'Do you like cheese',
        creator: 'AlyxDeLunar',
        createdAt: '2018-03-21',
        finishedAt: '',
        finished: false,
        options: [{
          name: 'yes',
          votes: 1000
        }, {
          name: 'no',
          votes: 1
        }]
      }]
    }
  }
}
</script>

<style scoped lang="scss">
#poll-list {
  li {
    list-style: none;
  }
}

</style>
