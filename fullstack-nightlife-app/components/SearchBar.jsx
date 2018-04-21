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
          onChange = {this.handleChange}
          required />
        <input type="submit" value="search" />
      </form>
    )
  }
}

export default SearchBar
