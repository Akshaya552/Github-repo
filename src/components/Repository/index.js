import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import GithubContext from '../../context/GithubContext'
import RepositoryItem from '../RepositoryItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class Repository extends Component {
  state = {repositoryList: [], repoStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchRepositoryList()
  }

  fetchRepositoryList = async () => {
    const {username} = this.context
    this.setState({repoStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/repos/${username}?api_key=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`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const repositoryList = data.map(each => ({
        name: each.name,
        owner: {login: each.owner.login, avatarUrl: each.owner.avatar_url},
        description: each.description,
        stargazersCount: each.stargazers_count,
        forksCount: each.forks_count,
        languages: each.languages,
      }))
      this.setState({repositoryList, repoStatus: apiStatusConstants.success})
    } else {
      this.setState({repoStatus: apiStatusConstants.failure})
    }
  }

  renderRepoSuccessview = () => {
    const {repositoryList} = this.state
    return repositoryList.length > 0 ? (
      <>
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
        <p className="no-repsorities">No Repositories Found!</p>
      </div>
    )
  }

  onRepositoryTryagain = () => {
    this.fetchRepositoryList()
  }

  renderFailureView = () => {
    const {username} = this.context

    return username === '' ? (
      this.renderEmptyUsername()
    ) : (
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
  }

  renderEmptyUsername = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Empty_Box_Illustration_1_krsttf.png"
        alt="empty repositories"
        className="initial-image"
      />
      <h1 className="repo-empty-heading">No Data Found</h1>
      <p className="repo-empty-text">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <Link to="/" className="link-item">
        <button type="button" className="home-button">
          Go to Home
        </button>
      </Link>
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
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="repo-main-container">{this.renderRepo()}</div>
        </div>
      </>
    )
  }
}

Repository.contextType = GithubContext

export default Repository
