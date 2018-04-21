import PropTypes from 'prop-types'

const Layout = props => (
  <div className="page">
    <div className="content">
      {props.children}
    </div>
  </div>
)
Layout.propTypes = {
  children: PropTypes.element.isRequired
}

export default Layout
