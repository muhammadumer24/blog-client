import { Navigate } from "react-router-dom"

export default ({ userName, children }) => {
  if (userName) {
    return children
  } else {
    return <Navigate to={"/"} />
  }
}
