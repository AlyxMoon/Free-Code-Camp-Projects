import { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import fetch from 'isomorphic-unfetch'

import styleCalendar from 'react-big-calendar/lib/css/react-big-calendar.css'

import Header from '../components/Header'

const options = {
  timeout: 10000
}

const withLayout = ComposedComponent => {
  class Layout extends Component {
    static async getInitialProps ({ query, pathname, req, res }) {
      console.log('hitting getInitialProps', query)
      if (pathname === '/user') {
        let user = {}
        if (req) {
          res.cookie('authRedirect', pathname, { expire: (new Date() + 1000) })
          if (req.user) user = req.user
        } else {
          document.cookie = `authRedirect=${pathname}; expire:${new Date() + 1000}`
          if (query.user) user = query.user
        }

        if (user.schedule) {
          console.log('trying to update user schedule')
          let dates = Object.keys(user.schedule)
          for (let date of dates) {
            let bars = Object.keys(user.schedule[date])
            for (let bar of bars) {
              let barInfo = await fetch(`http://localhost:50032/api/bar/${bar}`)
              let parsedBarInfo = await barInfo.json()
              user.schedule[date][bar].name = parsedBarInfo.name
            }
          }
        }

        return {
          user
        }
      }

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

      const resBars = await fetch(`http://localhost:50032/api/bars${options}`)
      const data = await resBars.json()

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

      console.log('hit the constructor', this.state, props)

      this.state = {
        user: {
          secret: props.user._id,
          twitterID: props.user.twitterID,
          twitterUsername: props.user.twitterUsername,
          twitterAvatar: props.user.twitterAvatar,
          friends: props.user.friends,
          schedule: props.user.schedule
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
              user={this.state.user}
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

              .calendar-wrapper {
                height: 400px;
              }

              ${styleCalendar}
            `}</style>
          </div>
        </AlertProvider>
      )
    }
  }

  Layout.propTypes = {
    bars: PropTypes.array,
    total: PropTypes.number,
    location: PropTypes.string,
    offset: PropTypes.number,
    user: PropTypes.object.isRequired
  }

  return Layout
}

export default withLayout
