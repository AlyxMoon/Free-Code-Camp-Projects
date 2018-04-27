import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Paginator from '../components/Paginator'
import SearchBar from '../components/SearchBar'
import BarList from '../components/BarList'

class Home extends React.Component {
  static async getInitialProps ({ query }) {
    const offset = query.offset || '0'
    const location = query.location || ''

    const user = query.user || {}

    if (location === '') {
      return {
        data: { bars: [], total: 0 },
        location,
        offset,
        user
      }
    }

    const options = `?location=${location}&offset=${offset}`

    const res = await fetch(`http://localhost:50032/api/bars${options}`)
    const data = await res.json()
    data.bars.forEach(async (bar) => {
      let schedule = await fetch(`http://localhost:50032/api/schedule/bar/${bar.id}`)
      bar.schedule = await schedule.json()
    })

    return {
      data,
      location,
      offset,
      user
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: {
        secret: props.user._id,
        twitterID: props.user.twitterID,
        twitterUsername: props.user.twitterUsername,
        twitterAvatar: props.user.twitterAvatar
      }
    }

    this.logout = this.logout.bind(this)
  }

  logout () {
    Router.push('/auth/logout')
  }

  render () {
    return (
      <Layout>
        <Header
          username={this.state.user.twitterUsername || ''}
          avatar={this.state.user.twitterAvatar || ''}
          logout={this.logout}
        />
        <Paginator total={this.props.data.total} location={this.props.location} />
        <SearchBar />
        <BarList bars={this.props.data.bars} />
      </Layout>
    )
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  offset: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default Home
