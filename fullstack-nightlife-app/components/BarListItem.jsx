import { Component } from 'react'
import PropTypes from 'prop-types'
import Calendar from 'react-big-calendar'
import { withAlert } from 'react-alert'
import moment from 'moment'

import styleCalendar from 'react-big-calendar/lib/css/react-big-calendar.css'

const { isPast } = require('../lib/time')

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

class ConfirmBarAttendanceModal extends Component {
  render () {
    return (
      <div className="modal">
        <div className="modal-window">
          <div>
            <button onClick={() => { this.props.confirm(true) }}>Yes, I&apos;m Going</button>
            <button onClick={() => { this.props.confirm(false) }}>No, I&apos;m not Going</button>
          </div>
        </div>
        <style jsx>{`
          .modal {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: auto;
            height: auto
            margin: auto;
            background: rgba(0,0,0,0.5);
            z-index: 10;
          }
        `}</style>
      </div>
    )
  }
}

ConfirmBarAttendanceModal.propTypes = {
  confirm: PropTypes.func.isRequired
}

class BarListItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dateGoing: '',
      showModal: false
    }

    this.handleGoing = this.handleGoing.bind(this)
    this.handleSelectDate = this.handleSelectDate.bind(this)
  }

  handleGoing (going) {
    this.setState({ showModal: false })
    if (this.state.dateGoing === '') return

    if (isPast(moment(this.state.dateGoing).valueOf())) {
      this.props.alert.error('You cannot go in the past! Live in the present my friend :)')
      return
    }
    this.props.setStatusGoing(this.state.dateGoing, this.props.bar.id, going)
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

  handleSelectDate (slotInfo) {
    if (slotInfo.action === 'select') return
    this.setState({
      showModal: true,
      dateGoing: moment(slotInfo.start).format('YYYY-MM-DD')
    })
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
        <img src={this.props.bar.image_url} />
        <p><a href={this.props.bar.url}>Link to Yelp page</a></p>

        { this.state.showModal && <ConfirmBarAttendanceModal confirm={this.handleGoing} /> }
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
  setStatusGoing: PropTypes.func.isRequired,
  alert: PropTypes.object
}

export default withAlert(BarListItem)
