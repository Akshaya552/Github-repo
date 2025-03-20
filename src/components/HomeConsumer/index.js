import GithubContext from '../../context/GithubContext'
import Home from '../Home'

const HomeConsumer = () => (
  <GithubContext.Consumer>
    {value => {
      const {username, changeUsername} = value
      return <Home username={username} changeUsername={changeUsername} />
    }}
  </GithubContext.Consumer>
)

export default HomeConsumer
