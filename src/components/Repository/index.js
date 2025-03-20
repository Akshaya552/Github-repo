import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import RepositoryItem from '../RepositoryItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class Repository extends Component {
  state = {
    repositoryList: [],
    repoStatus: apiStatusConstants.initial,
    owner: [],
  }

  componentDidMount() {
    this.fetchRepositoryList()
    console.log('component')
  }

  fetchRepositoryList = async () => {
    const {username} = this.props
    this.setState({repoStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/repos/${username}?api_key=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`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const repositoryList = data.map(each => ({
        name: each.name,
        description: each.description,
        owner: {
          login: each.owner.login,
          avatarUrl: each.owner.avatar_url,
        },
        stargazersCount: each.stargazers_count,
        forksCount: each.forks_count,
        languages: each.languages,
      }))
      const owner = {
        login: data[0].owner.login,
        avatarUrl: data[0].owner.avatar_url,
      }
      this.setState({
        repositoryList,
        repoStatus: apiStatusConstants.success,
        owner,
      })
    } else {
      this.setState({repoStatus: apiStatusConstants.failure})
    }
  }

  renderRepoSuccessview = () => {
    const {repositoryList, owner} = this.state

    return repositoryList.length > 0 ? (
      <>
        <div className="analysis-avatar-container">
          <h1 className="avatar-name">{owner.login}</h1>
          <img
            src={owner.avatarUrl}
            alt={owner.login}
            className="repoitem-avatar"
          />
        </div>
        <h1 className="repo-heading">Repositories</h1>
        <ul className="repo-unordered-list">
          {repositoryList.map(repository => (
            <RepositoryItem repository={repository} key={repository.name} />
          ))}
        </ul>
      </>
    ) : (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Layer_3_fi2pjp.png"
          alt="no repositories"
          className="initial-image"
        />
        <h1 className="no-repsorities">No Repositories Found!</h1>
      </div>
    )
  }

  onRepositoryTryagain = () => {
    this.fetchRepositoryList()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315292/Group_7522_oczjib.png"
        alt="failure view"
        className="initial-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onRepositoryTryagain}
      >
        Try again
      </button>
    </div>
  )

  onRepositoryGohome = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderEmptyUsername = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Empty_Box_Illustration_1_krsttf.png"
        alt="empty repositories"
        className="empty-image"
      />
      <h1 className="repo-empty-heading">No Data Found</h1>
      <p className="repo-empty-text">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>

      <button
        type="button"
        className="home-button"
        onClick={this.onRepositoryGohome}
      >
        Go to Home
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="failure-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderRepo = () => {
    const {repoStatus} = this.state
    switch (repoStatus) {
      case apiStatusConstants.success:
        return this.renderRepoSuccessview()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {username} = this.props
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="repo-main-container">
            {username === '' ? this.renderEmptyUsername() : this.renderRepo()}
          </div>
        </div>
      </>
    )
  }
}

export default Repository
