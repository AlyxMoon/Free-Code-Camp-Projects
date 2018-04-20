import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

const Home = props => (
  <Layout>
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

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:50032/api/bars?location=Portland,OR')
  const data = await res.json()

  return { data }
}

Home.propTypes = {
  data: PropTypes.object.isRequired
}

export default Home
