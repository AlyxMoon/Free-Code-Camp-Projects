import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Paginator from '../components/Paginator'

const Home = props => (
  <Layout>
    <Paginator total={props.data.total} />
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
  const options = `?location=Portland,OR&offset=${query.offset}`
  console.log(options)

  const res = await fetch(`http://localhost:50032/api/bars${options}`)
  const data = await res.json()

  console.log(data.bars[0])
  return { data }
}

Home.propTypes = {
  data: PropTypes.object.isRequired
}

export default Home
