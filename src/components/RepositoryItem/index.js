import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {GoGitBranch} from 'react-icons/go'
import './index.css'

const RepositoryItem = props => {
  const {repository} = props
  const {
    name,
    description,
    forksCount,
    stargazersCount,
    languages,
    owner,
    // extra,
  } = repository
  return (
    <li className="repoitem-container">
      <Link to={`/repositories/${name}`} className="link-item">
        <div className="repoitem-avatar-container">
          <p className="repoitem-name">{name}</p>
          <img
            src={owner.avatarUrl}
            alt={owner.login}
            className="repoitem-avatar"
          />
        </div>
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
      </Link>
    </li>
  )
}

export default RepositoryItem
