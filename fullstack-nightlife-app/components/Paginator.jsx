import { Component } from 'react'
import PropTypes from 'prop-types'
import { DEFAULT_API_QUERY_LIMIT } from '../lib/consts'

import Link from 'next/link'
import Router from 'next/router'

const PaginatorLink = props => (
  <Link as="/" href={{ pathname: '/', query: { offset: props.number, location: props.location } }}>
    <a>
      <li className={props.active ? 'active' : ''}>
        { props.text ? props.text : props.number + 1 }
      </li>
      <style jsx>{`
        a {
          color: black;
          text-decoration: none;
        }
        li {
          background-color: white;
          border: 1px solid #DDD;
          border-radius: 4px;
          display: inline-block;
          font-weight: bold;
          margin: 1px;
          padding: 5px;
          height: 20px;
          width: 25px;
          text-align: center;
          user-select: none;
        }

        .active {
          background-color: #3174AD;
          color: white;
        }
      `}</style>
    </a>
  </Link>
)
PaginatorLink.propTypes = {
  location: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  active: PropTypes.bool,
  text: PropTypes.string
}

class Paginator extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    let maxLinks = 5
    let limit = Math.ceil(nextProps.total / prevState.countPerPage)

    let start = nextProps.currentPage - 3
    if (start + maxLinks > limit) {
      start = limit - maxLinks
    }
    if (start < 0) start = 0

    let pageNumbers = []
    for (let i = start, count = 0; i < limit && count < maxLinks; i++, count++) {
      pageNumbers.push(i)
    }

    return { limit, pageNumbers }
  }

  constructor (props) {
    super(props)

    this.state = {
      gotoPage: '',
      limit: 0,
      pageNumbers: [],
      countPerPage: DEFAULT_API_QUERY_LIMIT
    }

    this.handleChangeGotoPage = this.handleChangeGotoPage.bind(this)
    this.goto = this.goto.bind(this)
  }

  handleChangeGotoPage (event) {
    this.setState({ gotoPage: event.target.value })
  }

  goto () {
    let page = this.state.gotoPage
    if (page > this.state.limit) page = this.state.limit
    if (page < 1) page = 1

    Router.push({
      pathname: '/',
      query: {
        location: this.props.location,
        offset: page - 1
      }
    }, '/')
  }

  render () {
    let props = this.props

    return (
      <div className="paginator">
        <hr />
        <ul className="pagination-item">
          <PaginatorLink
            number={0}
            location={props.location}
            text="<<"
          />
          <PaginatorLink
            number={props.currentPage - 2}
            location={props.location}
            text="<"
          />
          {this.state.pageNumbers.map((i) => (
            <PaginatorLink
              key={`pagination-${i}`}
              number={i}
              location={props.location}
              active={(i + 1) === props.currentPage}
            />
          ))}
          <PaginatorLink
            number={props.currentPage}
            location={props.location}
            text=">"
          />
          <PaginatorLink
            number={this.state.limit - 1}
            location={props.location}
            text=">>"
          />
        </ul>
        <p className="pagination-item">
          <label className="pagination-label" htmlFor="goto">Goto Page:</label>
          <input
            name="goto"
            type="number"
            min="0"
            max={this.state.limit}
            value={this.state.gotoPage}
            onChange={this.handleChangeGotoPage} />
          <input type="button" value="go" onClick={this.goto} />
        </p>
        <hr />
        <style jsx>{`
          .paginator {
            color: #EEE;
          }

          .pagination-item {
            display: flex;
            justify-content: center;
            padding-left: 0;
          }

          .pagination-label {
            font-weight: bold;
            margin-right: 5px;
          }

          ul {
            list-style: none;
            display: inline-block;
          }
        `}</style>
      </div>
    )
  }
}

Paginator.propTypes = {
  location: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Paginator
