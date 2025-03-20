import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomeConsumer from './components/HomeConsumer'
import RepositoryConsumer from './components/RepositoryConsumer'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import NotFound from './components/NotFound'
import AnalysisConsumer from './components/AnalysisConsumer'
import Githubcontext from './context/GithubContext'
import './App.css'

class App extends Component {
  state = {username: ''}

  changeUsername = username => {
    this.setState({username})
  }

  render() {
    const {username} = this.state
    return (
      <>
        <Githubcontext.Provider
          value={{username, changeUsername: this.changeUsername}}
        >
          <Switch>
            <Route exact path="/" component={HomeConsumer} />
            <Route exact path="/repositories" component={RepositoryConsumer} />
            <Route
              exact
              path="/repositories/:reponame"
              component={RepositoryItemDetails}
            />
            <Route exact path="/analysis" component={AnalysisConsumer} />
            <Route exact path="/notfound" component={NotFound} />
            <Redirect to="/notfound" />
          </Switch>
        </Githubcontext.Provider>
      </>
    )
  }
}

export default App
