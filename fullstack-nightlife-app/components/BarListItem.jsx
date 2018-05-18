import { Component } from 'react'
import PropTypes from 'prop-types'
import Calendar from 'react-big-calendar'
import moment from 'moment'

import IntoxicationLevel from './IntoxicationLevel'
import Rating from './Rating'

const { isPast } = require('../lib/time')

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

class BarListItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showCollapsable: false,
      stylingShowCollapsable: false
    }

    this.toggleCollapsable = this.toggleCollapsable.bind(this)
    this.handleSelectDate = this.handleSelectDate.bind(this)
  }

  componentDidMount () {
    this.setState({ alertify: require('alertifyjs') })
  }

  toggleCollapsable () {
    this.setState({ stylingShowCollapsable: !this.state.stylingShowCollapsable })
    let timeout = 0
    if (this.state.showCollapsable) timeout = 500
    window.setTimeout(() => {
      this.setState({ showCollapsable: !this.state.showCollapsable })
    }, timeout)
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
    let date = moment(slotInfo.start).format('YYYY-MM-DD')

    this.props.onCalendarClick((
      <p>Do you want to go to <b>{this.props.bar.name}</b> on <b>{date}</b>?</p>
    ), date, this.props.bar.id)
  }

  render () {
    return (
      <div className="bar" key={this.props.bar.id}>
        <div className="bar-info">
          <img className="bar-image" src={this.props.bar.image_url} />
          <div className="bar-info-meta">
            <a href={this.props.bar.url}><h2>{this.props.bar.name}</h2></a>
            <div>
              Rating:
              <span className="sm-push-down">
                <Rating rating={this.props.bar.rating} />
                Reviews - {this.props.bar.review_count}
              </span>
            </div>
            <div>
              Price: {this.props.bar.price} {this.props.bar.categories.map(category => (
                <span className="category-list-item" key={category.alias}>
                  {category.title}
                </span>
              ))}
            </div>
            <div>
              Average Intoxication Level:
              <span className="sm-push-down">
                <IntoxicationLevel level={this.getAverageIntoxLevel(this.props.bar.schedule)} />
              </span>
            </div>

            <div>Total Visits: {this.getTotalCountOfAttendees(this.props.bar.schedule)}</div>
            <div>People Going Today: {this.getTodayCountofAttendees(this.props.bar.schedule)}</div>
          </div>
        </div>

        <div className={`collapsable-wrapper ${this.state.stylingShowCollapsable ? 'show' : ''}`}>
          <div onClick={this.toggleCollapsable} className="collapsable-title">
            {this.state.showCollapsable ? 'Hide Schedule' : 'Show Schedule'}
          </div>
          { this.state.showCollapsable && (
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
          )}
          <span>To say you are going to visit the bar, open the calendar and click on the day you would like to go.</span>
        </div>

        <style jsx>{`
          .bar {
            background-color: white;
            margin-bottom: 20px;
            padding: 5px;
          }

          .bar-info {
            display: flex;
          }

          .bar-info-meta {
            margin-left: 5px;
          }

          .bar-info-meta h2 {
            margin: 3px;
          }
          .bar-info-meta div {
            font-weight: bold;
            margin: 3px;
          }

          .bar-image {
            border-radius: 5px;
            height: 150px;
            width: 150px;
          }

          .collapsable-wrapper {
            border: 2px solid rgba(0,0,0,0.5);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            margin: 10px 0;
            max-height: 65px;
            overflow-y: hidden;
            padding: 5px;
            transition: max-height 0.5s;
            user-select: none;
          }
          .collapsable-wrapper.show {
            max-height: 700px;
            transition: max-height 1s;
          }

          .collapsable-title {
            border-bottom: 1px solid rgba(0,0,0,0.4);
            cursor: pointer;
            font-weight: bold;
            font-size: 18px;
            margin: 10px 0;
            padding: 5px;
          }

          @media (max-width: 520px) {
            display: block;
            margin-bottom: 5px;
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
