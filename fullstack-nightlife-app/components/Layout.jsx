import PropTypes from 'prop-types'

const Layout = props => (
  <div className="page">
    <div className="content">
      {props.children}
    </div>
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
  </div>
)
Layout.propTypes = {
  children: PropTypes.any.isRequired
}

export default Layout
