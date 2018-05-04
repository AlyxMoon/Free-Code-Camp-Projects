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
      <div className="navbar">
        <div className="nav-item">
          <span className="inner-text">Results powered by:</span>
          <img src="/static/yelp.png" />
        </div>
        <div className="nav-item pull-right">
          { this.props.username
            ? (<a href="#" onClick={this.handleClick}>
              {this.props.username}
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
        <style jsx>{`
          .navbar {
            background-color: black;
            height: 50px;
            line-height: 50px;
            margin: 0 -5px;
            padding: 0 5px;
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
          }

          a {
            color: white;
            font-size: 20px;
            text-align: center;
            text-decoration: none;
            transition-duration: 0.2s;
            vertical-align: top;
          }
          a:hover {
            color: #3FB0AC;
          }

          .nav-dropdown.menu a {
            color: black;
          }

          img {
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
