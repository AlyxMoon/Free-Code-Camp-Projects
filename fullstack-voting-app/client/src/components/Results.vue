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
          {{ option.votes || 0 }}
        </text>
      </template>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'results',
  props: ['poll'],
  data () {
    return {
      barHeight: 30,
      barMargins: 3,
      textHeight: 16
    }
  },

  computed: {
    svgHeight: function () {
      if (!this.poll.options) return 0
      return this.poll.options.length * (this.textHeight + this.barHeight + this.barMargins * 2)
    },

    totalVotes: function () {
      if (!this.poll.options) return 0
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
      if (!votes) votes = 0
      return this.computeBarWidth(votes) + 1
    },
    computeVotesPosY (index) {
      return this.computeBarPosY(index) + this.textHeight + this.barMargins
    },
    computeBarWidth (votes) {
      if (!votes) votes = 0
      if (this.totalVotes === 0) return 1
      return Math.max((votes / this.totalVotes) * 100, 1)
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
