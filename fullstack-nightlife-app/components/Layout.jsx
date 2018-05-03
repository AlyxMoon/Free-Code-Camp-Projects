import PropTypes from 'prop-types'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 10000
}

const Layout = props => (
  <AlertProvider template={AlertTemplate} {...options}>
    <div className="page">
      <div className="content">
        {props.children}
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }

        .page {
          padding: 0 5px;
        }
      `}</style>
    </div>
  </AlertProvider>
)
Layout.propTypes = {
  children: PropTypes.any.isRequired
}

export default Layout
