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
        bars: [],
        total: 0,
        location,
        offset,
        user
      }
    }

    const options = `?location=${location}&offset=${offset}`

    const res = await fetch(`http://localhost:50032/api/bars${options}`)
    const data = await res.json()
    console.log(data)

    return {
      bars: data.bars,
      total: data.total,
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
    this.setStatusGoing = this.setStatusGoing.bind(this)
  }

  logout () {
    Router.push('/auth/logout')
  }

  async setStatusGoing (dateGoing, barId, going = true) {
    let queryParams = `?dateGoing=${dateGoing}`
    queryParams += `&barId=${barId}`
    queryParams += `&going=${going}`
    if (this.state.user.secret && this.state.user.twitterID) {
      queryParams += `&twitterID=${this.state.user.twitterID}`
      queryParams += `&secret=${this.state.user.secret}`
    }

    const res = await fetch(`http://localhost:50032/api/setGoing${queryParams}`)
    const data = await res.json()

    console.log('about to router push', data)
    if (data.error) console.error(data.error)
    else {
      Router.push({
        pathname: '/',
        query: {
          location: this.props.location,
          offset: this.props.offset
        }
      }, '/')
    }
  }

  render () {
    return (
      <Layout>
        <Header
          username={this.state.user.twitterUsername || ''}
          avatar={this.state.user.twitterAvatar || ''}
          logout={this.logout}
        />
        <Paginator
          total={this.props.total}
          location={this.props.location} />
        <SearchBar />
        { this.props.bars.length > 0 &&
          <BarList
            bars={this.props.bars}
            setStatusGoing={this.setStatusGoing} />
        }
      </Layout>
    )
  }
}

Home.propTypes = {
  bars: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  offset: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default Home
