import { Component } from 'react'
import PropTypes from 'prop-types'

class BarList extends Component {
  render () {
    return (
      <div className="bar-list">
        { this.props.bars.map(bar => (
          <div className="bar" key={bar.id}>
            <h1>{bar.name}</h1>
            <img src={bar.image_url} />
            <p><a href={bar.url}>Link to Yelp page</a></p>
          </div>
        ))}
        <style jsx>{`
          img {
            width: 100px;
            height: 100px;
          }
        `}</style>
      </div>
    )
  }
}

BarList.propTypes = {
  bars: PropTypes.array.isRequired
}

export default BarList
