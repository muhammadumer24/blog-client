import "../css/register.css"
import axios from "axios"
import { useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"
const Login = (props) => {
  const [loading, setLoading] = useState(false)
  const handleForm = async (e) => {
    e.preventDefault()
    const userName = e.target.userName.value
    const password = e.target.password.value
    try {
      setLoading(true)
      const { data: token } = await axios.post("http://localhost:2457/login", {
        userName,
        password,
      })
      localStorage.setItem("token", token)
      alert("Sucess")
      window.location.pathname = "/"
    } catch (error) {
      setLoading("")
      alert(
        error.response
          ? error.response.data
          : "Something went wrong. Please try again later"
      )
      console.log(error)
    }
  }
  //component
  return (
    <>
      {loading && <BiLoaderCircle className="loading" />}
      <form onSubmit={handleForm}>
        <label>
          <span>User or Email</span>
          <input type="text" name="userName" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </>
  )
}
export default Login
