import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import GithubContext from '../../context/GithubContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {userData: [], isError: false, homeStatus: apiStatusConstants.initial}

  fetchUserDetails = async () => {
    this.setState({homeStatus: apiStatusConstants.inProgress})
    const {username} = this.context
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const userData = {
        avatarUrl: data.avatar_url,
        login: data.login,
        name: data.name,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        company: data.company,
        blog: data.blog,
        location: data.location,
      }
      this.setState({
        userData,
        homeStatus: apiStatusConstants.success,
        isError: false,
      })
    } else {
      this.setState({homeStatus: apiStatusConstants.failure, isError: true})
    }
  }

  onHomeTryagain = () => {
    this.fetchUserDetails()
  }

  rendeFailureView = () => (
    <>
      <h1 className="initial-heading">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315292/Group_7522_oczjib.png"
        alt="failure view"
        className="initial-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onHomeTryagain}
      >
        Try again
      </button>
    </>
  )

  renderInitialView = () => (
    <>
      <h1 className="initial-heading">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315292/Group_2_vx1w1q.png"
        alt="gitHub profile visualizer home page"
        className="initial-image"
      />
    </>
  )

  renderSuccessView = () => {
    const {userData} = this.state
    const {
      avatarUrl,
      location,
      login,
      name,
      followers,
      following,
      publicRepos,
      bio,
      blog,
      company,
    } = userData
    return (
      <>
        <img src={avatarUrl} alt={name} className="avatar-image" />
        <p className="login-text">{login}</p>
        <h1 className="name-heading">{name}</h1>
        <p className="name-heading">BIO</p>
        <p className="name-heading">{bio}</p>
        <div className="main-wrapper-container">
          <div className="individual-container">
            <p className="count-text">{followers}</p>
            <p className="category-title">FOLLOWERS</p>
          </div>
          <hr className="vertical-line" />
          <div className="individual-container">
            <p className="count-text">{following}</p>
            <p className="category-title">FOLLOWING</p>
          </div>
          <hr className="vertical-line" />
          <div className="individual-container">
            <p className="count-text">{publicRepos}</p>
            <p className="category-title">PUBLIC REPOS</p>
          </div>
        </div>
        <div className="blog-wrapper-container">
          <div className="company-container">
            <p className="blue-heading">Company</p>
            <p className="details-text">
              <span className="icon">
                <RiBuildingLine />
              </span>
              {company}
            </p>
          </div>
          <div className="blog-container">
            <p className="blue-heading">Blog</p>
            <p className="details-text">
              <span className="icon">
                <IoMdLink />
              </span>
              {blog}
            </p>
          </div>
          <div className="location-container">
            <p className="blue-heading">Location</p>
            <p className="details-text">
              <span className="icon">
                <IoLocationOutline />
              </span>
              {location}
            </p>
          </div>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="card-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  onChangeUsername = event => {
    const {changeUsername} = this.context
    changeUsername(event.target.value)
  }

  onClickSearch = () => {
    this.fetchUserDetails()
  }

  onKeyDownEvent = event => {
    if (event.key === 'Enter') {
      this.fetchUserDetails()
    }
  }

  renderHome = () => {
    const {homeStatus} = this.state
    switch (homeStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.rendeFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {username} = this.context
    const {isError} = this.state
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="card-container">
            <div className="search-container">
              <input
                onKeyDown={this.onKeyDownEvent}
                value={username}
                onChange={this.onChangeUsername}
                type="search"
                className={
                  isError ? 'search-input error-search' : 'search-input'
                }
                placeholder="Enter github username"
              />
              <button
                data-testid="searchButton"
                aria-label="search"
                type="button"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <HiOutlineSearch />
              </button>
            </div>
            {isError && (
              <p className="error-text">Enter the valid github username</p>
            )}
            {this.renderHome()}
          </div>
        </div>
      </>
    )
  }
}

Home.contextType = GithubContext

export default Home
