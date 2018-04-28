import { Component } from 'react'
import PropTypes from 'prop-types'

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
    this.props.setStatusGoing(this.state.dateGoing, this.props.bar.id)
  }

  getTotalCountOfAttendees (schedule = {}) {
    let keys = Object.keys(schedule)

    if (keys.length === 0) return 0
    return keys.reduce((sum, day) => {
      return schedule[day].count + sum
    }, 0)
  }

  render () {
    return (
      <div className="bar" key={this.props.bar.id}>
        <h1>{this.props.bar.name}</h1>
        <p>Total Number Visited: {this.getTotalCountOfAttendees(this.props.bar.schedule)}</p>
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
