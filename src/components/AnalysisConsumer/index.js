import GithubContext from '../../context/GithubContext'
import Analysis from '../Analysis'

const AnalysisConsumer = () => (
  <GithubContext.Consumer>
    {value => {
      const {username} = value
      return <Analysis username={username} />
    }}
  </GithubContext.Consumer>
)

export default AnalysisConsumer
