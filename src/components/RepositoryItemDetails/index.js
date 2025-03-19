import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {GoGitBranch} from 'react-icons/go'
import {
  Tooltip,
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import './index.css'
import Header from '../Header'
import GithubContext from '../../context/GithubContext'

const colorPie = ['#54CA76', '#31A4E6', '#E99559', '#F2637F', '#9261F3']

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class RepositoryItemDetails extends Component {
  state = {
    repoitem: [],
    languages: [],
    owner: [],
    contributors: [],
    repoitemstatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchRepositoryItemDetails()
  }

  fetchRepositoryItemDetails = async () => {
    this.setState({repoitemstatus: apiStatusConstants.inProgress})
    const {username} = this.context
    const {match} = this.props
    const {params} = match
    const {reponame} = params

    const resposne = await fetch(
      `https://apis2.ccbp.in/gpv/specific-repo/${username}/${reponame}?api_key=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`,
    )
    if (resposne.ok === true) {
      const data = await resposne.json()
      const repoitem = {
        name: data.name,
        description: data.description,
        stargazersCount: data.stargazers_count,
        watchersCount: data.watchers_count,
        forksCount: data.forks_count,
        openIssuesCount: data.open_issues_count,
      }
      const owner = {login: data.owner.login, avatarUrl: data.owner.avatar_url}
      const lanuages = data.lanuages.map(every => ({
        name: every.name,
        value: every.value,
      }))
      const contributors = data.contributors.map(each => ({
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repoitem,
        owner,
        languages: lanuages,
        contributors,
        repoitemstatus: apiStatusConstants.success,
      })
    } else {
      this.setState({repoitemstatus: apiStatusConstants.failure})
    }
  }

  renderRepoItemSuccessView = () => {
    const {repoitem, languages, owner, contributors} = this.state
    const {
      name,
      description,
      stargazersCount,
      watchersCount,
      openIssuesCount,
      forksCount,
    } = repoitem

    return (
      <>
        <div className="analysis-avatar-container">
          <p className="avatar-name">{owner.login}</p>
          <img
            src={owner.avatarUrl}
            alt={owner.login}
            className="repoitem-avatar"
          />
        </div>
        <div className="repodetailed-container">
          <h1 className="repoitem-heading">{name}</h1>
          <p className="description">{description}</p>
          <ul className="language-container">
            {languages.map((each, index) => (
              <li key={each.name}>
                <p className={`language-item color${index % 5}`}>{each.name}</p>
              </li>
            ))}
          </ul>
          <div className="language-container">
            <span className="star-icon">
              <FaStar />
            </span>
            <p className="star-count">{stargazersCount}</p>
            <span className="fork-icon">
              <GoGitBranch />
            </span>
            <p className="star-count">{forksCount}</p>
          </div>
          <div className="main-couting-container">
            <div className="box-container">
              <p className="box-heading">Watchers Counts</p>
              <p className="box-count-text">{watchersCount}</p>
            </div>
            <div className="box-container">
              <p className="box-heading">Issues Counts</p>
              <p className="box-count-text">{openIssuesCount}</p>
            </div>
          </div>
          <h1 className="contributors-heading">Contributors</h1>
          <p className="contributors-length">{contributors.length} Members</p>
          <ul className="contrinutors-container">
            {contributors.map(contributor => (
              <li key={contributor.id}>
                <img
                  src={contributor.avatarUrl}
                  alt="contributor profile"
                  className="contributor-image"
                />
              </li>
            ))}
          </ul>
          <h1 className="contributors-heading">Languages</h1>
          <div className="language-responsive-contianer">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languages}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {languages.map((entry, index) => (
                    <Cell
                      key={entry.name + entry.value}
                      fill={colorPie[index % 5]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="square"
                  wrapperStyle={{
                    fontSize: '15px',
                    fontFamily: 'Roboto',
                    lineHeight: '32px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    )
  }

  renderRepoitemLoadingView = () => (
    <div className="failure-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  onRepoItemTryagain = () => {
    this.fetchRepositoryItemDetails()
  }

  renderRepoitemFailureView = () => (
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
        onClick={this.onRepoItemTryagain}
      >
        Try again
      </button>
    </div>
  )

  renderDetailedRepo = () => {
    const {repoitemstatus} = this.state
    switch (repoitemstatus) {
      case apiStatusConstants.success:
        return this.renderRepoItemSuccessView()
      case apiStatusConstants.failure:
        return this.renderRepoitemFailureView()
      case apiStatusConstants.inProgress:
        return this.renderRepoitemLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="repo-main-container">{this.renderDetailedRepo()}</div>
        </div>
      </>
    )
  }
}

RepositoryItemDetails.contextType = GithubContext

export default RepositoryItemDetails
