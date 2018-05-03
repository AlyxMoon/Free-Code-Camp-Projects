import PropTypes from 'prop-types'
import { DEFAULT_API_QUERY_LIMIT } from '../lib/consts'

import Link from 'next/link'

const PaginatorLink = props => (
  <Link as="/" href={{ pathname: '/', query: { offset: props.number, location: props.location } }}>
    <a>
      <li className={props.active ? 'active' : ''}>
        { props.text ? props.text : props.number + 1 }
      </li>
      <style jsx>{`
        li {
          border: 1px solid #DDD;
          border-radius: 4px;
          display: inline-block;
          margin: 1px;
          padding: 5px;
          height: 20px;
          width: 25px;
          text-align: center;
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
  active: PropTypes.bool.isRequired,
  text: PropTypes.string
}

const Paginator = props => {
  let maxLinks = 5
  let limit = Math.ceil(props.total / props.countPerPage)

  let start = props.currentPage - 3
  if (start + maxLinks > limit) {
    start = limit - maxLinks
  }
  if (start < 0) start = 0

  let pageNumbers = []
  for (let i = start, count = 0; i < limit && count < maxLinks; i++, count++) {
    pageNumbers.push(i)
  }

  return (
    <div className="paginator">
      <ul className="pagination">
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
        {pageNumbers.map((i) => (
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
          number={limit - 1}
          location={props.location}
          text=">>"
        />
      </ul>
      <hr />
      <style jsx>{`
        .paginator {
          max-height: 70px;
          overflow: hidden;
        }

        .pagination {
          display: flex;
          justify-content: center;
          padding-left: 0;
        }

        .pagination-label {
          font-weight: bold;
        }

        ul {
          list-style: none;
          display: inline-block;
        }
      `}</style>
    </div>
  )
}

Paginator.defaultProps = {
  countPerPage: DEFAULT_API_QUERY_LIMIT
}

Paginator.propTypes = {
  location: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Paginator
