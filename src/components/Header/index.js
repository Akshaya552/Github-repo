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
            <Link to="/" className="link-item">
              <li
                className={
                  activeTab === '/'
                    ? 'nav-list-item active-color'
                    : 'nav-list-item'
                }
              >
                Home
              </li>
            </Link>
            <Link to="/repositories" className="link-item">
              <li
                className={
                  activeTab === '/repositories' ||
                  activeTab.startsWith('/repositories/')
                    ? 'nav-list-item active-color'
                    : 'nav-list-item'
                }
              >
                Repositories
              </li>
            </Link>
            <Link to="/analysis" className="link-item">
              <li
                className={
                  activeTab === '/analysis'
                    ? 'nav-list-item active-color'
                    : 'nav-list-item'
                }
              >
                Analysis
              </li>
            </Link>
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
            <Link to="/" className="link-item">
              <li
                className={
                  activeTab === '/'
                    ? 'nav-list-item active-color'
                    : 'nav-list-item'
                }
              >
                Home
              </li>
            </Link>
            <Link to="/repositories" className="link-item">
              <li
                className={
                  activeTab === '/repositories' ||
                  activeTab.startsWith('/repositories/')
                    ? 'nav-list-item active-color'
                    : 'nav-list-item'
                }
              >
                Repositories
              </li>
            </Link>
            <Link to="/analysis" className="link-item">
              <li
                className={
                  activeTab === '/analysis'
                    ? 'nav-list-item active-color'
                    : 'nav-list-item'
                }
              >
                Analysis
              </li>
            </Link>
          </ul>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
