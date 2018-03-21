import Vue from 'vue'
import Router from 'vue-router'
import Poll from '@/components/Poll'
import PollList from '@/components/PollList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PollList',
      component: PollList
    },
    {
      path: '/poll/:poll',
      name: 'Poll',
      component: Poll
    }
  ]
})
