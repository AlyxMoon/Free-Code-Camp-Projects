<template>
  <div id="poll" class="container">
    <component-voting></component-voting>
    <hr />
    <component-results></component-results>
  </div>
</template>

<script>
import Results from './Results'
import Voting from './Voting'

export default {
  name: 'Poll',
  components: {
    'component-voting': Voting,
    'component-results': Results
  }
}
</script>

<style scoped lang="scss">

</style>
