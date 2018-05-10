import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Paginator from '../components/Paginator'
import SearchBar from '../components/SearchBar'
import BarList from '../components/BarList'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.setStatusGoing = this.setStatusGoing.bind(this)
  }

  async setStatusGoing (dateGoing, barId, going = true) {
    let queryParams = `?dateGoing=${dateGoing}`
    queryParams += `&barId=${barId}`
    queryParams += `&going=${going}`
    if (this.props.user.secret && this.props.user.twitterID) {
      queryParams += `&twitterID=${this.props.user.twitterID}`
      queryParams += `&secret=${this.props.user.secret}`
    }

    const res = await fetch(`http://localhost:50032/api/setGoing${queryParams}`)
    const data = await res.json()

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
      <div>
        { this.props.bars.length > 0 &&
          <Paginator
            total={this.props.total}
            location={this.props.location}
            currentPage={this.props.offset + 1}
          />
        }
        <div className="yelp-wrapper">
          <span>Results powered by:</span>
          <a href="https://www.yelp.com"><img src="/static/yelp.png" /></a>
        </div>
        <SearchBar />
        { this.props.bars.length > 0 &&
          <BarList
            bars={this.props.bars}
            setStatusGoing={this.setStatusGoing} />
        }
        <style jsx>{`
          .yelp-wrapper {
            background-color: #DDD;
            border-radius: 10%;
            display: flex;
            justify-content: center;
            height: 50px;
            line-height: 50px;
            margin: 5px auto;
            min-width: 200px;
            max-width: 300px;
            padding: 5px;
          }

          .yelp-wrapper img {
            background-color: #D32323;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

Home.propTypes = {
  bars: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
}

export default Layout(Home)
