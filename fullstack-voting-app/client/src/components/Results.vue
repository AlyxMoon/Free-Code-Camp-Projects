<template>
  <div id="results">
    <button
      class="btn"
      v-on:click="showResults = !showResults"
      v-if="!alwaysShow || !poll.finished" >
      Show Results
    </button>
    <transition name="fade">
      <pie-chart
        class="chart"
        v-if="showResults || (alwaysShow && poll.finished)"
        :donut="true"
        :data="chartData"
        :library="{ animation: { animateRotate: true, animateScale: true }}"
       />
   </transition>
  </div>
</template>

<script>
export default {
  name: 'results',
  props: ['poll', 'alwaysShow'],
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
  transition-duration: 0.5s;
  overflow: hidden;
}
.fade-leave {
   max-height: 900px;
}
.fade-leave-to {
  max-height: 0;
}

.btn {
  height: 4vh;
  width: 20vh;

}
</style>
