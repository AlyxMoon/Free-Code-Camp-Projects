import { Component } from 'react'
import PropTypes from 'prop-types'

class BarListItem extends Component {
  constructor (props) {
    super(props)

    this.handleGoing = this.handleGoing.bind(this)
  }

  handleGoing () { }

  getTotalCountOfAttendees (schedule) {
    if (!schedule) return 0
    return Object.keys(schedule).reduce((sum, day) => {
      return schedule[day].count + sum
    }, 0)
  }

  render () {
    return (
      <div className="bar" key={this.props.bar.id}>
        <h1>{this.props.bar.name}</h1>
        <p>Total Number Visited: {this.getTotalCountOfAttendees(this.props.bar.schedule)}</p>
        <img src={this.props.bar.image_url} />
        <input type="date" />
        <input type="button" value="Going" onClick={this.handleGoing} />
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
  bar: PropTypes.object.isRequired
}

class BarList extends Component {
  render () {
    return (
      <div className="bar-list">
        { this.props.bars.map(bar => (
          <BarListItem bar={bar} key={bar.id} />
        ))}
      </div>
    )
  }
}

BarList.propTypes = {
  bars: PropTypes.array.isRequired
}

export default BarList
