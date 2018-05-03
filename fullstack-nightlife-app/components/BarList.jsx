import { Component } from 'react'
import PropTypes from 'prop-types'

import BarListItem from './BarListItem'

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
