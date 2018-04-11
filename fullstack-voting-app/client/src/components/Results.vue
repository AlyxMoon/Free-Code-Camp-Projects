<template>
  <div id="results">
    <button class="btn" v-on:click="showResults = !showResults">
      Show Results
    </button>
    <transition name="fade">
      <pie-chart
      class="chart"
      v-show="showResults"
      :donut="true"
      :data="chartData"
      :library="{ animation: { animateRotate: true }}"
       />
   </transition>
  </div>
</template>

<script>
export default {
  name: 'results',
  props: ['poll'],
  data () {
    return {
      showResults: false
    }
  },
  computed: {
    chartData: function () {
      if (!this.poll.options) return []
      return this.poll.options.map(option => {
        return [option.name, option.votes]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.fade-leave-active {
  transition-duration: 1s;
  overflow: hidden;
}
.fade-leave {
   max-height: 900px;
}
.fade-leave-to {
  max-height: 0;
}
</style>
