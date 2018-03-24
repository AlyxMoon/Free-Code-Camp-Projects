<template>
  <div id="poll-list">
    <div class="container">
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
  </div>
</template>

<script>
export default {
  name: 'PollList',
  data () {
    return {
      polls: [{
        _id: 1,
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
        _id: 2,
        name: 'Do you like cheese',
        creator: 'SomeGuyWithAReallyLongNameThatMessesUpFormatting',
        createdAt: '2018-03-21',
        finishedAt: '',
        finished: true,
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
.container {
  background-color: #F4F7F6;
  margin: auto;
  min-height: 100px;
  width: 100%;

  @media (min-width: 768px) {
    width: 85%;
  }

  a {
    color: black;
    text-decoration: none;
  }

  h1 {
    text-align: center;
  }

  .row {
    border-bottom: 1px solid black;
    font-size: 0;
    padding: 5px 5px;

    &:hover {
      background: #D5E4DF;
    }

    * {
      display: inline-block;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: bottom;
    }
  }
}

span[class^="voting-"] {
  color: white;
  margin: auto;
  text-align: center;
  width: 90%;
}

.voting-open {
  background-color: #218838;
}
.voting-finished {
  background-color: #C82333;
}

</style>
