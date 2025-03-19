import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import './index.css'
import Header from '../Header'
import GithubContext from '../../context/GithubContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

const piecolor = [
  '#54CA76',
  '#31A4E6',
  '#E99559',
  '#F2637F',
  '#9261F3',
  '#B5AFA6',
  '#b72be0',
  '#d11f7d',
  '#c3d11f',
  '#1f3ed1',
  '#762bf0',
]

class Analysis extends Component {
  state = {
    analysisLength: 0,
    user: [],
    quarterCommitData: [],
    langCommitData: [],
    langRepoData: [],
    repoCommitData: [],
    analysisStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchAnalysisList()
  }

  fetchAnalysisList = async () => {
    const {username} = this.context
    this.setState({analysisStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=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`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const user = {login: data.user.login, avatarUrl: data.user.avatarUrl}
      const quarterCommitData = Object.keys(data.quarterCommitCount).map(
        key => ({
          name: key,
          value: data.quarterCommitCount[key],
        }),
      )
      const langRepoData = Object.keys(data.langRepoCount).map(key => ({
        name: key,
        value: data.langRepoCount[key],
      }))
      const langCommitData = Object.keys(data.langCommitCount).map(key => ({
        name: key,
        value: data.langCommitCount[key],
      }))
      const repoCommitData = Object.keys(data.repoCommitCount).map(key => ({
        name: key,
        value: data.repoCommitCount[key],
      }))

      this.setState({
        user,
        quarterCommitData,
        langCommitData,
        langRepoData,
        repoCommitData,
        analysisLength: Object.keys(data).length,
        analysisStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({analysisStatus: apiStatusConstants.failure})
    }
  }

  renderanalysisSuccessView = () => {
    const {
      user,
      quarterCommitData,
      langCommitData,
      langRepoData,
      repoCommitData,
      analysisLength,
    } = this.state

    return analysisLength === 0 ? (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Layer_3_fi2pjp.png"
          alt="no analysis"
          className="initial-image"
        />
        <p className="no-repsorities">No Analysis Found!</p>
      </div>
    ) : (
      <>
        <div className="analysis-avatar-container">
          <p className="avatar-name">{user.login}</p>
          <img
            src={user.avatarUrl}
            alt={user.login}
            className="repoitem-avatar"
          />
        </div>
        <h1 className="repo-heading">Analysis</h1>
        <div className="analysis-container">
          <ResponsiveContainer width="100%" height={270}>
            <LineChart
              data={quarterCommitData}
              margin={{top: 5, right: 20, bottom: 5, left: 0}}
            >
              <Line
                type="monotone"
                dataKey="value"
                fill="#3B82F6"
                strokeWidth={2}
              />
              {quarterCommitData.map(entry => (
                <ReferenceLine
                  key={entry.value}
                  x={entry.name}
                  stroke="#3B82F6"
                  strokeDasharray="2 2"
                  strokeWidth={0.2}
                />
              ))}
              <XAxis
                dataKey="name"
                stroke="#3B82F6"
                tick={{fontSize: 13}}
                strokeWidth={1.5}
              />
              <YAxis
                stroke="#3B82F6"
                tick={{fontSize: 13}}
                domain={['auto', 'auto']}
                strokeWidth={1.5}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
          <p className="commmit-text">Commits Per Quarter</p>
        </div>
        <div className="piecharts-container">
          <div className="individual-piecontainer">
            <h1 className="repo-heading">Language Per Repos</h1>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={langRepoData}
                  cx="40%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {langRepoData.map((entry, index) => (
                    <Cell
                      key={entry.name + entry.value}
                      fill={piecolor[index % 11]}
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
                    fontSize: '13px',
                    fontFamily: 'Roboto',
                    lineHeight: '25px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="individual-piecontainer">
            <h1 className="repo-heading">Language Per Commits</h1>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={langCommitData}
                  cx="40%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {langCommitData.map((entry, index) => (
                    <Cell
                      key={entry.name + entry.value}
                      fill={piecolor[index % 11]}
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
                    fontSize: '13px',
                    fontFamily: 'Roboto',
                    lineHeight: '25px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <h1 className="repo-heading">Commits Per Repo (Top 10)</h1>
        <div className="repocommit-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={repoCommitData}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {repoCommitData.map((entry, index) => (
                  <Cell
                    key={entry.name + entry.value}
                    fill={piecolor[index % 11]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                iconType="square"
                wrapperStyle={{
                  fontSize: '13px',
                  fontFamily: 'Roboto',
                  lineHeight: '25px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </>
    )
  }

  onAnalysiTryagain = () => {
    this.fetchAnalysisList()
  }

  renderAnalysisFailureView = () => {
    const {username} = this.context

    return username === '' ? (
      this.renderAnalysisEmptyUsername()
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
          onClick={this.onAnalysiTryagain}
        >
          Try again
        </button>
      </div>
    )
  }

  renderAnalysisEmptyUsername = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Empty_Box_Illustration_1_krsttf.png"
        alt="empty analysis"
        className="initial-image"
      />
      <h1 className="repo-empty-heading">No Data Found</h1>
      <p className="repo-empty-text">
        GitHub Username is empty, please provide a valid username for analysis
      </p>
      <Link to="/" className="link-item">
        <button type="button" className="home-button">
          Go to Home
        </button>
      </Link>
    </div>
  )

  renderAnalysisLoadingView = () => (
    <div className="failure-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderAnalysis = () => {
    const {analysisStatus} = this.state
    switch (analysisStatus) {
      case apiStatusConstants.success:
        return this.renderanalysisSuccessView()
      case apiStatusConstants.failure:
        return this.renderAnalysisFailureView()
      case apiStatusConstants.inProgress:
        return this.renderAnalysisLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="repo-main-container">{this.renderAnalysis()}</div>
        </div>
      </>
    )
  }
}

Analysis.contextType = GithubContext

export default Analysis
