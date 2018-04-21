import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component {
  render () {
    return (
      <div className="navbar">
        <div className="nav-item">
          { this.props.username
            ? (<a href="#">{this.props.username}</a>)
            : (<a href="/auth/twitter">Login/Register</a>)
          }

        </div>
        <style jsx>{`
          .navbar {
            background-color: black;
            height: 50px;
            line-height: 50px;
          }

          .nav-item {
            display: inline-block;
            float: right;
            padding-right: 5px;
            height: 100%;
          }

          .nav-dropdown-menu {
            background-color: white;
            border: 1px solid grey;
            border-radius: 5px;

            min-width: 80px;
            padding: 5px;
            position: absolute;
            right: 0;
            text-align: center;
            top: 30px;
          }

          a {
            color: white;
            font-size: 20px;
            text-align: center;
            text-decoration: none;
            transition-duration: 0.2s;
          }
          a:hover {
            color: #3FB0AC;
          }

          .nav-dropdown.menu a {
            color: black;
          }

        `}</style>
      </div>
    )
  }
}

Header.propTypes = {
  username: PropTypes.string
}

export default Header
