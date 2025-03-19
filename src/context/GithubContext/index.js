import React from 'react'

const GithubContext = React.createContext({
  username: '',
  changeUsername: () => {},
})

export default GithubContext
