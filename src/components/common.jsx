import { Outlet } from "react-router-dom"
import Header from "./header"
export default (props) => {
  const { userName } = props
  return (
    <>
      <Header userName={userName} />
      <Outlet />
    </>
  )
}
