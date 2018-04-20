import PropTypes from 'prop-types'
import { DEFAULT_API_QUERY_LIMIT } from '../lib/consts'

import Link from 'next/link'

const PaginatorLink = props => (
  <Link as="/" href={{ pathname: '/', query: { offset: props.number } }}>
    <a>
      <li>
        {props.number + 1}
      </li>
      <style jsx>{`
        li {
          border: 1px solid #DDD;
          border-radius: 4px;
          display: inline-block;
          margin: 1px;
          padding: 5px;
        }
      `}</style>
    </a>
  </Link>
)
PaginatorLink.propTypes = {
  number: PropTypes.number.isRequired
}

const Paginator = props => {
  let limit = props.total / props.countPerPage
  let pageNumbers = []
  for (let i = 0; i < limit; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <span className="pagination-label">Jump to Page:</span>
      <ul className="pagination">
        {pageNumbers.map((i) => (
          <PaginatorLink key={`pagination-${i}`} number={i} />
        ))}
      </ul>
      <hr />
      <style jsx>{`
        .pagination, .pagination-label {
          padding-left: 40px;
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
  total: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired
}

export default Paginator
