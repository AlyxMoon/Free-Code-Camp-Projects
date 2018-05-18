import PropTypes from 'prop-types'

const Rating = props => (
  <span>
    <img
      src={`/static/ratings/regular_${props.rating}.png`}
      title={`Average User Rating: ${props.rating}`}></img>
    <style jsx>{`
      img {
        margin: 0 3px;
        vertical-align: middle;
      }
    `}</style>
  </span>
)

Rating.propTypes = {
  rating: PropTypes.number.isRequired
}

export default Rating
