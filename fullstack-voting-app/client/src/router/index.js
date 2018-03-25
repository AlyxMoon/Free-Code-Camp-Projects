import Vue from 'vue'
import Router from 'vue-router'
import Poll from '@/components/Poll'
import PollList from '@/components/PollList'
import AddPoll from '@/components/AddPoll'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PollList',
      component: PollList
    },
    {
      path: '/poll/add',
      name: 'AddPoll',
      component: AddPoll
    },
    {
      path: '/poll/:poll',
      name: 'Poll',
      component: Poll
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
