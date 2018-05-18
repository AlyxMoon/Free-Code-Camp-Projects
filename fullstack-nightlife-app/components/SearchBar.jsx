import React from 'react'
import Router from 'next/router'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = { location: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ location: event.target.value })
  }

  handleSubmit (event) {
    if (this.state.location === '') return

    Router.push({
      pathname: '/',
      query: { location: this.state.location, offset: 0 }
    }, '/')
    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit = {this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          value = {this.state.location}
          onChange = {this.handleChange} />
        <input className="btn btn-primary" type="submit" value="search" />
        <style jsx>{`
          form {
            display: flex;
            justify-content: center;
          }

          input[type="text"] {
            border-color: #3174AD;
            border-width: 1px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            height: 18px;
            font-size: 18px;
            line-height: 18px;
            padding: 5px;
            vertical-align: bottom;
            width: 70%;
          }
          input[type="text"]:focus {
            outline: none;
            box-shadow: 0 0 3pt 1pt #3174AD;
          }

          input[type="submit"] {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            cursor: pointer;
            margin: 0;
            vertical-align: bottom;
            width: 20%;
          }
        `}</style>
      </form>
    )
  }
}

export default SearchBar
