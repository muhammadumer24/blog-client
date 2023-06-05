import { BrowserRouter, Route, Routes } from "react-router-dom"
import Common from "./components/common"
import Blog from "./pages/showBlog"
import NotFound from "./pages/notFound"
import Add from "./pages/add"
import Login from "./pages/login"
import { useEffect, useState } from "react"
import axios from "axios"
import Protected from "./utilities/protected"
import SingleBlog from "./pages/singleBlog"
export default () => {
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
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Common userName={userName} />}>
          <Route index element={<h1>Home</h1>} />
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
          <Route path="blogs" element={<Blog userName={userName} />} />
          <Route path="blogs/:title" element={<SingleBlog />} />
          <Route path="*" element={<NotFound userName={userName} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
