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
      path: '/mypolls',
      name: 'MyPollList',
      component: PollList,
      props: { onlyUserPolls: true }
    },
    {
      path: '/poll/add',
      name: 'AddPoll',
      component: AddPoll
    },
    {
      path: '/poll/:poll_id',
      name: 'Poll',
      component: Poll,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
