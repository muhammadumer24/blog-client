import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Common,
  Home,
  NotFound,
  Add,
  Login,
  Protected,
  SingleBlog,
} from "./utilities/imports"

const App = () => {
  const [userName, setUserName] = useState("")
  useEffect(() => {
    const check = async () => {
      try {
        const token = localStorage.getItem("token")
        const userInfo = await axios.get("http://localhost:2457/authorize", {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        })
        setUserName(userInfo.data.userName)
      } catch (err) {
        console.log(err)
      }
    }
    check()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Common userName={userName} />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<SingleBlog />} />
          <Route path="about" element={<h1>About</h1>} />
          <Route path="contact-us" element={<h1>Contact Me</h1>} />
          <Route path="login" element={<Login userName={userName} />} />
          <Route
            path="add"
            element={
              <Protected userName={userName}>
                <Add userName={userName} />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound userName={userName} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
