import { Fragment } from 'react'
import PropTypes from 'prop-types'

const IntoxicationLevel = props => {
  let level = props.level
  if (level > 5) level = 5

  let icons = []
  for (let i = 1; i <= 5; i++) {
    let fill = level >= i ? 'fill' : ''
    let selectable = props.selectable ? 'selectable' : ''
    icons.push((
      <i
        key={`intox-level-${i}`}
        className={`fas fa-beer intox-level ${fill} ${selectable}`}
        onClick={() => { props.onClickIcon(i) }}
      />
    ))
  }

  return (
    <Fragment>
      { icons }
    </Fragment>
  )
}

IntoxicationLevel.defaultProps = {
  level: 0,
  selectable: false,
  onClickIcon: () => {}
}

IntoxicationLevel.propTypes = {
  level: PropTypes.number,
  selectable: PropTypes.bool,
  onClickIcon: PropTypes.func
}

export default IntoxicationLevel
