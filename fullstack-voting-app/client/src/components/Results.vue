<template>
  <div id="results">
    <h1>Poll Results</h1>
    <svg :height="svgHeight" class="chart">
      <template v-for="(option, key) in poll.options" >
        <rect
            :key="'rect-' + key"
            :width="`${computeBarWidth(option.votes)}%`"
            :height="barHeight"
            x="0"
            :y="computeBarPosY(key)"
        />
        <text
          :key="'label-' + key"
          x="0"
          :y="computeTextPosY(key)"
        >
          {{ option.name }}
        </text>
        <text
          :key="'votes-' + key"
          :y="computeVotesPosY(key)"
          :style="`transform: translateX(${computeVotesTransformX(option.votes)}%)`"
        >
          {{ option.votes }}
        </text>
      </template>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'results',

  data () {
    return {
      barHeight: 30,
      barMargins: 3,
      textHeight: 16,
      poll: {
        _id: 1,
        name: 'Are things working?',
        creator: 'AlyxDeLunar',
        createdAt: '2018-03-21',
        finishedAt: '2018-05-30',
        finished: false,
        options: [{
          name: 'yes',
          votes: 10
        }, {
          name: 'no',
          votes: 4
        }, {
          name: 'no1',
          votes: 5
        }, {
          name: 'no2',
          votes: 6
        }, {
          name: 'no3',
          votes: 0
        }, {
          name: 'no4',
          votes: 1
        }, {
          name: 'no5',
          votes: 99
        }, {
          name: 'no6',
          votes: 4
        }]
      }
    }
  },

  computed: {
    svgHeight: function () {
      return this.poll.options.length * (this.textHeight + this.barHeight + this.barMargins * 2)
    },

    totalVotes: function () {
      return this.poll.options.reduce((total, option) => {
        return total + option.votes
      }, 0)
    }
  },

  methods: {
    computeBarPosY (index) {
      return (this.textHeight + this.barHeight + this.barMargins) * index + this.textHeight + this.barMargins
    },
    computeTextPosY (index) {
      return this.computeBarPosY(index) - this.barMargins
    },
    computeVotesTransformX (votes) {
      return this.computeBarWidth(votes) + 1
    },
    computeVotesPosY (index) {
      return this.computeBarPosY(index) + this.textHeight + this.barMargins
    },
    computeBarWidth (votes) {
      return (votes / this.totalVotes) * 100
    }

  }
}
</script>

<style scoped lang="scss">

svg {
  width: 100%;
}

rect {
  fill: #3FB0AC;
  stroke: black;
  stroke-width: 1;
}

text {
  font-size: 16px;
  font-weight: bold;
}

</style>
