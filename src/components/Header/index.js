import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

class Header extends Component {
  state = {ishidden: true}

  onClickToggleButton = () => {
    this.setState(prev => ({ishidden: !prev.ishidden}))
  }

  render() {
    const {ishidden} = this.state
    const {location} = this.props
    const activeTab = location.pathname

    return (
      <div className="header-container">
        <div className="navbar-container">
          <Link to="/" className="link-item">
            <h1 className="home-navigation-heading">
              Github Profile Visualizer
            </h1>
          </Link>
          <ul className="large-unordered-list">
            <li className="nav-list-item">
              <Link
                to="/"
                className={activeTab === '/' ? ' active-color' : ' normal'}
              >
                Home
              </Link>
            </li>

            <li className="nav-list-item">
              <Link
                to="/repositories"
                className={
                  activeTab === '/repositories' ||
                  activeTab.startsWith('/repositories/')
                    ? ' active-color'
                    : 'normal'
                }
              >
                Repositories
              </Link>
            </li>

            <li className="nav-list-item">
              <Link
                to="/analysis"
                className={
                  activeTab === '/analysis' ? 'active-color' : 'normal'
                }
              >
                Analysis
              </Link>
            </li>
          </ul>
          <button
            onClick={this.onClickToggleButton}
            aria-label="hamburger"
            className="hamburger-button"
            type="button"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        {!ishidden && (
          <ul className="sm-unordered-list">
            <li className="nav-list-item">
              <Link
                to="/"
                className={activeTab === '/' ? 'active-color' : 'normal'}
              >
                Home
              </Link>
            </li>

            <li className="nav-list-item">
              <Link
                to="/repositories"
                className={
                  activeTab === '/repositories' ||
                  activeTab.startsWith('/repositories/')
                    ? 'active-color'
                    : 'normal'
                }
              >
                Repositories
              </Link>
            </li>

            <li className="nav-list-item">
              <Link
                to="/analysis"
                className={
                  activeTab === '/analysis' ? 'active-color' : 'normal'
                }
              >
                Analysis
              </Link>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
