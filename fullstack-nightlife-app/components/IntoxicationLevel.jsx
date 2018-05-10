import { Fragment } from 'react'
import PropTypes from 'prop-types'

const IntoxicationLevel = props => {
  let level = props.level
  if (level > 5) level = 5

  let icons = []
  for (let i = 1; i <= 5; i++) {
    let fill = level >= i ? 'fill' : ''
    icons.push((
      <i className={'fas fa-beer intox-level ' + fill} />
    ))
  }

  return (
    <Fragment>
      { icons }
    </Fragment>
  )
}

IntoxicationLevel.defaultProps = {
  level: 0
}

IntoxicationLevel.propTypes = {
  level: PropTypes.number
}

export default IntoxicationLevel
