import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({showMenu: !this.state.showMenu})
  }

  render () {
    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="nav-item">
            <a href="/">
              FCC Nightlife
            </a>
          </div>
          <div className="nav-item pull-right">
            { this.props.username
              ? (<a href="#" onClick={this.handleClick}>
                <span className="hide-xs">{this.props.username}</span>
                <i className={`icon ${this.state.showMenu ? 'icon-up-arrow' : 'icon-down-arrow'}`}></i>
                <img src={this.props.avatar} />
              </a>
              )
              : (<a href="/auth/twitter">Login/Register</a>)
            }
            { this.state.showMenu &&
              <div className="nav-modal">
                <hr />
                <a href="/user">Profile</a>
                <hr />
                <a href="/auth/logout">Logout</a>
                <hr />
              </div>
            }
          </div>
        </div>
        <div className="navbar-padding"></div>
        <div className="attribution">
          <span>Results powered by:</span>
          <a href="https://www.yelp.com"><img src="/static/yelp.png" /></a>
        </div>
        <style jsx>{`
          .navbar {
            background-color: black;
            height: 50px;
            line-height: 50px;
            margin: 0;
            padding: 0 5px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
          }

          .navbar-padding {
            height: 50px;
          }

          .attribution {
            background-color: black;
            color: white;
            display: inline-block;
            height: 50px;
            line-height: 50px;
            margin-left: -10px;
            margin-bottom: 10px;
            padding: 5px;
          }

          .attribution span {
            vertical-align: top;
          }

          .attribution img {
            background-color: #D32323;
            height: 50px;
            width: 80px;
          }

          .nav-item {
            color: white;
            display: inline-block;
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

          .nav-modal {
            background-color: black;
            border-radius: 10px;
            line-height: normal;
            margin-top: -10px;
            padding: 5px;
            position: relative;
            text-align: center;
            z-index: 5;
          }

          a {
            color: white;
            font-size: 20px;
            line-height: 50px;
            text-align: center;
            text-decoration: none;
            transition-duration: 0.2s;
            vertical-align: top;
          }
          a:hover {
            color: #3FB0AC;
          }

          a span {
            vertical-align: top;
          }

          .nav-dropdown.menu a {
            color: black;
          }

          .navbar img {
            border-radius: 50%;
            height: 90%;
            margin-left: 5px;
          }

          i.icon {
            vertical-align: text-bottom;
          }

          i.icon-down-arrow::before {
            content: "▼";
          }
          i.icon-up-arrow::before {
            content: "▲";
          }

          .pull-right {
            float: right;
            text-align: right;
          }

          .inner-text {
            vertical-align: top;
          }

        `}</style>
      </div>
    )
  }
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

export default Header
