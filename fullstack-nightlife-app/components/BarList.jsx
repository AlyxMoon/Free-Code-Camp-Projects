import { Component } from 'react'
import Calendar from 'react-big-calendar'
import PropTypes from 'prop-types'
import moment from 'moment'

import styleCalendar from 'react-big-calendar/lib/css/react-big-calendar.css'

const { isPast } = require('../lib/time')

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

class BarListItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dateGoing: ''
    }

    this.handleGoing = this.handleGoing.bind(this)
    this.handleChangeGoing = this.handleChangeGoing.bind(this)
  }

  handleChangeGoing (event) {
    this.setState({ dateGoing: event.target.value })
  }

  handleGoing () {
    if (this.state.dateGoing === '') return

    if (isPast(moment(this.state.dateGoing).valueOf())) {
      alert('You cannot go in the past! Live in the present my friend :)')
      return
    }
    this.props.setStatusGoing(this.state.dateGoing, this.props.bar.id)
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
      return {
        start: moment(key),
        end: moment(key),
        title: `Going: ${schedule[key].count}`
      }
    })
  }

  render () {
    return (
      <div className="bar" key={this.props.bar.id}>
        <h1>{this.props.bar.name}</h1>
        <div className="calendar-wrapper">
          <Calendar events={this.getEventsFromSchedule(this.props.bar.schedule)} onView='month' views={['month']} />
        </div>
        <p>Total Number Visited: {this.getTotalCountOfAttendees(this.props.bar.schedule)}</p>
        <p>People Going Today: {this.getTodayCountofAttendees(this.props.bar.schedule)}</p>
        <img src={this.props.bar.image_url} />
        <input
          type="date"
          value={this.state.dateGoing}
          onChange={this.handleChangeGoing} />
        <input
          type="button"
          value="Going"
          onClick={this.handleGoing} />
        <p><a href={this.props.bar.url}>Link to Yelp page</a></p>

        <style jsx>{`
          img {
            display: block;
            height: 100px;
            width: 100px;
          }
          .calendar-wrapper {
            height: 400px;
          }
          ${styleCalendar}
        `}</style>
      </div>
    )
  }
}

BarListItem.propTypes = {
  bar: PropTypes.object.isRequired,
  setStatusGoing: PropTypes.func.isRequired
}

class BarList extends Component {
  render () {
    return (
      <div className="bar-list">
        { this.props.bars.map(bar => (
          <BarListItem
            bar={bar}
            key={bar.id}
            setStatusGoing={this.props.setStatusGoing} />
        ))}
      </div>
    )
  }
}

BarList.propTypes = {
  bars: PropTypes.array.isRequired,
  setStatusGoing: PropTypes.func.isRequired
}

export default BarList
