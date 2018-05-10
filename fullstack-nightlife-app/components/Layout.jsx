import { Component } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

import styleCalendar from 'react-big-calendar/lib/css/react-big-calendar.css'
import styleAlertify from 'alertifyjs/build/css/alertify.min.css'
import styleAlertifyDefault from 'alertifyjs/build/css/themes/default.min.css'

import Header from '../components/Header'

const withLayout = ComposedComponent => {
  class Layout extends Component {
    static async getInitialProps ({ query, pathname, req, res }) {
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
      } else {
        res.cookie('authRedirect', `${pathname}${options}`, { expire: (new Date() + 1000) })
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
          twitterAvatar: props.user.twitterAvatar,
          friends: props.user.friends,
          schedule: props.user.schedule
        }
      }
    }

    render () {
      let { user, ...leftoverProps } = this.props
      return (
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

            .calendar-wrapper {
              height: 400px;
            }

            button {
              cursor: pointer;
            }

            @media (max-width: 768px) {
              .hide-xs {
                display: none;
              }
            }

            .intox-level {
              background-color: #DDD;
              border-radius: 5px;
              color: white;
              margin: 0 2px;
              padding: 4px;
            }

            .intox-level.fill {
              color: red;
            }

            ${styleCalendar}

            ${styleAlertify}

            ${styleAlertifyDefault}
          `}</style>
        </div>
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
