import { Navigate } from 'react-router-dom'

const TOKEN = 'fake_token'

function AuthRoute({ children }) {
  if (TOKEN) {
    return <>{children}</>
  } else {
    return <Navigate to={'login'} />
  }
}

export default AuthRoute
