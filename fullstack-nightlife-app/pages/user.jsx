import { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Calendar from 'react-big-calendar'

import Layout from '../components/Layout'

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

class User extends Component {
  getEventsFromSchedule (schedule = {}) {
    let keys = Object.keys(schedule)
    let events = []

    keys.forEach(date => {
      let bars = Object.keys(schedule[date])
      bars.forEach(bar => {
        if (schedule[date][bar].going) {
          events.push({
            start: moment(date).toDate(),
            end: moment(date).toDate(),
            title: schedule[date][bar].name
          })
        }
      })
    })

    return events
  }

  render () {
    return (
      <div>
        { this.props.user.twitterUsername
          ? <span>Hello {this.props.user.twitterUsername}!</span>
          : <span>You need to be logged in to view anything on this page</span>
        }
        { this.props.user.schedule &&
          <div>
            <h2>Schedule of Bars</h2>
            <div className="calendar-wrapper">
              <Calendar
                events={this.getEventsFromSchedule(this.props.user.schedule)}
                defaultDate={new Date()}
                defaultView='month'
                views={['month']}
                popup
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default Layout(User)
