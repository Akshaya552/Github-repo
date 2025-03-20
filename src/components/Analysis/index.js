import {Component} from 'react'
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
  CartesianGrid,
} from 'recharts'
import './index.css'
import Header from '../Header'

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
    quarterCommitCount: [],
    langCommitCount: [],
    langRepoCount: [],
    repoCommitCount: [],
    analysisStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchAnalysisList()
  }

  fetchAnalysisList = async () => {
    this.setState({analysisStatus: apiStatusConstants.inProgress})
    const {username} = this.props
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=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`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const user = {login: data.user.login, avatarUrl: data.user.avatarUrl}
      const quarterCommitCount = Object.keys(data.quarterCommitCount).map(
        key => ({
          quarter: key,
          commits: data.quarterCommitCount[key],
        }),
      )
      const langRepoCount = Object.keys(data.langRepoCount).map(key => ({
        name: key,
        value: data.langRepoCount[key],
      }))
      const langCommitCount = Object.keys(data.langCommitCount).map(key => ({
        name: key,
        value: data.langCommitCount[key],
      }))
      const repoCommitCount = Object.keys(data.repoCommitCount).map(key => ({
        name: key,
        value: data.repoCommitCount[key],
      }))

      this.setState({
        user,
        quarterCommitCount,
        langCommitCount,
        langRepoCount,
        repoCommitCount,
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
      quarterCommitCount,
      langCommitCount,
      langRepoCount,
      repoCommitCount,
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
          <h1 className="avatar-name">{user.login}</h1>
          <img
            src={user.avatarUrl}
            alt={user.login}
            className="repoitem-avatar"
          />
        </div>
        <h1 className="repo-heading">Analysis</h1>
        <div className="analysis-container">
          <LineChart
            width={1000}
            height={300}
            data={quarterCommitCount}
            margin={{top: 5, right: 20, bottom: 5, left: 0}}
          >
            <Line
              type="monotone"
              dataKey="commits"
              fill="#3B82F6"
              strokeWidth={2}
              name="Commits"
            />
            <CartesianGrid
              horizontal={false}
              stroke="#3B82F6"
              strokeDasharray="2 2"
              strokeWidth={0.4}
            />
            <XAxis
              dataKey="quarter"
              stroke="#3B82F6"
              tick={{fontSize: 13}}
              strokeWidth={1.5}
            />
            <YAxis stroke="#3B82F6" tick={{fontSize: 13}} strokeWidth={1.5} />
            <Tooltip />
          </LineChart>
          <p className="commmit-text">Commits Per Quarter</p>
        </div>
        <div className="piecharts-container">
          <div className="individual-piecontainer">
            <h1 className="repo-heading">Language Per Repos</h1>

            <PieChart width={1000} height={300}>
              <Pie
                data={langRepoCount}
                cx="40%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {langRepoCount.map((entry, index) => (
                  <Cell key={entry.name} fill={piecolor[index % 11]} />
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
                  lineHeight: '25px',
                }}
              />
            </PieChart>
          </div>
          <div className="individual-piecontainer">
            <h1 className="repo-heading">Language Per Commits</h1>

            <PieChart width={1000} height={300}>
              <Pie
                data={langCommitCount}
                cx="40%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {langCommitCount.map((entry, index) => (
                  <Cell key={entry.name} fill={piecolor[index % 11]} />
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
                  lineHeight: '25px',
                }}
              />
            </PieChart>
          </div>
        </div>
        <h1 className="repo-heading">Commits Per Repo (Top 10)</h1>
        <div className="repocommit-container">
          <PieChart>
            <Pie
              data={repoCommitCount}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {repoCommitCount.map((entry, index) => (
                <Cell key={entry.name} fill={piecolor[index % 11]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              iconType="square"
              wrapperStyle={{
                fontSize: '16px',
                fontFamily: 'Roboto',
                lineHeight: '25px',
              }}
            />
          </PieChart>
        </div>
      </>
    )
  }

  onAnalysiTryagain = () => {
    this.fetchAnalysisList()
  }

  renderAnalysisFailureView = () => (
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

  onAnalysisGohome = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderAnalysisEmptyUsername = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Empty_Box_Illustration_1_krsttf.png"
        alt="empty analysis"
        className="empty-image"
      />
      <h1 className="repo-empty-heading">No Data Found</h1>
      <p className="repo-empty-text">
        GitHub username is empty, please provide a valid username for Analysis
      </p>

      <button
        type="button"
        className="home-button"
        onClick={this.onAnalysisGohome}
      >
        Go to Home
      </button>
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
    const {username} = this.props
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="repo-main-container">
            {username === ''
              ? this.renderAnalysisEmptyUsername()
              : this.renderAnalysis()}
          </div>
        </div>
      </>
    )
  }
}

export default Analysis
