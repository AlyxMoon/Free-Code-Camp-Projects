import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'
import Paginator from '../components/Paginator'
import SearchBar from '../components/SearchBar'
import BarList from '../components/BarList'

class Home extends React.Component {
  render () {
    return (
      <div>
        <SearchBar />
        { this.props.bars.length > 0 &&
          <Paginator
            total={this.props.total}
            location={this.props.location}
            currentPage={this.props.offset + 1}
          />
        }
        { this.props.bars.length > 0 &&
          <BarList
            bars={this.props.bars}
            setStatusGoing={this.props.setStatusGoing} />
        }
        { this.props.bars.length > 0 &&
          <Paginator
            total={this.props.total}
            location={this.props.location}
            currentPage={this.props.offset + 1}
          />
        }
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

Home.propTypes = {
  bars: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  setStatusGoing: PropTypes.func.isRequired
}

export default Layout(Home)
