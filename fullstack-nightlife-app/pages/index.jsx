import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Paginator from '../components/Paginator'
import SearchBar from '../components/SearchBar'

const Home = props => (
  <Layout>
    <Header />
    <Paginator total={props.data.total} location={props.location} />
    <SearchBar />
    { props.data.bars.map(bar => (
      <div className="bar" key={bar.id}>
        <h1>{bar.name}</h1>
        <img src={bar.image_url} />
        <p><a href={bar.url}>Link to Yelp page</a></p>
      </div>
    ))}
    <style jsx>{`
      img {
        width: 100px;
        height: 100px;
      }
    `}</style>
  </Layout>
)

Home.getInitialProps = async ({ query }) => {
  const offset = query.offset || 0
  const location = query.location || ''

  if (location === '') {
    return {
      data: { bars: [], total: 0 },
      location
    }
  }

  const options = `?location=${location}&offset=${offset}`
  console.log(options)

  const res = await fetch(`http://localhost:50032/api/bars${options}`)
  const data = await res.json()

  console.log(data)
  return {
    data,
    location
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired
}

export default Home
