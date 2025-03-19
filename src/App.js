import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Repository from './components/Repository'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import NotFound from './components/NotFound'
import Analysis from './components/Analysis'
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
            <Route exact path="/" component={Home} />
            <Route exact path="/repositories" component={Repository} />
            <Route
              exact
              path="/repositories/:reponame"
              component={RepositoryItemDetails}
            />
            <Route exact path="/analysis" component={Analysis} />
            <Route exact path="/notfound" component={NotFound} />
            <Redirect to="/notfound" />
          </Switch>
        </Githubcontext.Provider>
      </>
    )
  }
}

export default App
