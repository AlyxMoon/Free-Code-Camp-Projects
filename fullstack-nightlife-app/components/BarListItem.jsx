import { Component } from 'react'
import PropTypes from 'prop-types'
import Calendar from 'react-big-calendar'
import moment from 'moment'
import IntoxicationLevel from './IntoxicationLevel'

const { isPast } = require('../lib/time')

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

class BarListItem extends Component {
  constructor (props) {
    super(props)

    this.handleSelectDate = this.handleSelectDate.bind(this)
  }

  componentDidMount () {
    this.setState({ alertify: require('alertifyjs') })
  }

  getAverageIntoxLevel (schedule = {}) {
    let keys = Object.keys(schedule)

    if (keys.length === 0) return 0
    return Math.floor(keys.reduce((sum, day) => {
      let users = Object.keys(schedule[day].users)

      if (users.length === 0) return sum + 0
      return sum + users.reduce((sum2, user) => {
        return sum2 + schedule[day].users[user].intoxLevel
      }, 0)
    }, 0) / keys.length)
  }

  getTotalCountOfAttendees (schedule = {}) {
    let keys = Object.keys(schedule)

    if (keys.length === 0) return 0
    return keys.reduce((sum, day) => {
      return schedule[day].count + sum
    }, 0)
  }

  getTodayCountofAttendees (schedule = {}) {
    let today = new Date()
    let todayString = today.getFullYear() + '-'
    todayString += ('0' + (today.getMonth() + 1)).slice(-2) + '-'
    todayString += ('0' + (today.getDate())).slice(-2)

    if (schedule[todayString]) {
      return schedule[todayString].count
    }
    return 0
  }

  getEventsFromSchedule (schedule = {}) {
    let keys = Object.keys(schedule)

    return keys.map(key => {
      if (schedule[key].count > 0) {
        return {
          start: moment(key),
          end: moment(key),
          title: `Going: ${schedule[key].count}`
        }
      }
    })
  }

  handleSelectDate (slotInfo) {
    if (slotInfo.action === 'select') return
    if (isPast(moment(slotInfo.start).valueOf())) {
      this.state.alertify.error('Cannot go to an event in the past')
      return
    }

    this.props.onCalendarClick((
      <p>Do you want to go to <b>{this.props.bar.name}</b> on <b>{this.state.dateGoing}</b>?</p>
    ), moment(slotInfo.start).format('YYYY-MM-DD'), this.props.bar.id)
  }

  render () {
    return (
      <div className="bar" key={this.props.bar.id}>
        <h1>{this.props.bar.name}</h1>
        <div className="calendar-wrapper">
          <Calendar
            events={this.getEventsFromSchedule(this.props.bar.schedule)}
            defaultDate={new Date()}
            onView='month'
            views={['month']}
            selectable={'ignoreEvents'}
            onSelectSlot={this.handleSelectDate}
          />
        </div>
        <p>Total Number Visited: {this.getTotalCountOfAttendees(this.props.bar.schedule)}</p>
        <p>People Going Today: {this.getTodayCountofAttendees(this.props.bar.schedule)}</p>
        <p>
          Average Intoxication Level:
          <IntoxicationLevel level={this.getAverageIntoxLevel(this.props.bar.schedule)} />
        </p>
        <img src={this.props.bar.image_url} />
        <p><a href={this.props.bar.url}>Link to Yelp page</a></p>

        <style jsx>{`
          img {
            display: block;
            height: 100px;
            width: 100px;
          }
        `}</style>
      </div>
    )
  }
}

BarListItem.propTypes = {
  bar: PropTypes.object.isRequired,
  onCalendarClick: PropTypes.func.isRequired
}

export default BarListItem
