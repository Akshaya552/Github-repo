import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Group_7519_nxx4hd.png"
      alt="page not found"
      className="initial-image"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-text">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/" className="link-item">
      <button type="button" className="gohome-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
