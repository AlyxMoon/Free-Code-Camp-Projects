import React from 'react'

class Header extends React.Component {
  render () {
    return (
      <div className="navbar">
        <div className="nav-item">
          <a href="/auth/twitter">Login/Register</a>
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
        `}</style>
      </div>
    )
  }
}

export default Header
