import { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'

const options = {
  timeout: 10000
}

const withLayout = ComposedComponent => {
  class Layout extends Component {
    static async getInitialProps ({ query, pathname, asPath, req }) {
      const offset = parseInt(query.offset) || 0
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

      if (!req) {
        document.cookie = `authRedirect=${pathname}${options}; expires:${new Date() + 1000}`
      }

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
    }

    render () {
      let { user, ...leftoverProps } = this.props
      return (
        <AlertProvider template={AlertTemplate} {...options}>
          <div className="page">
            <Header
              username={this.state.user.twitterUsername || ''}
              avatar={this.state.user.twitterAvatar || ''}
            />
            <div className="content">
              <ComposedComponent user={this.state.user} {...leftoverProps} />
            </div>
            <style jsx global>{`
              body {
                margin: 0;
                padding: 0;
              }

              .page {
                padding: 0 5px;
              }
            `}</style>
          </div>
        </AlertProvider>
      )
    }
  }

  Layout.propTypes = {
    bars: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
  }

  return Layout
}

export default withLayout
