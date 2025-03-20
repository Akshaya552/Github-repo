import GithubContext from '../../context/GithubContext'
import Repository from '../Repository'

const RepositoryConsumer = () => (
  <GithubContext.Consumer>
    {value => {
      const {username} = value
      return <Repository username={username} />
    }}
  </GithubContext.Consumer>
)

export default RepositoryConsumer
