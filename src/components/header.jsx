import { Link } from "react-router-dom"
import "../css/reset.css"
import "../css/main.css"
import "../css/headerFooter.css"
import { FaUserCircle } from "react-icons/fa"
import { useEffect, useState } from "react"

export default ({ userName }) => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(userName)
  useEffect(() => {
    setUser(userName)
  })
  const handleLi = () => {
    setShow(!show)
  }
  return (
    <header>
      <nav>
        <ul>
          <li id="logo">
            <Link to={"/"}>
              <h1>Logo</h1>
            </Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/blogs"}>Blogs</Link>
          </li>
          <li style={{ whiteSpace: "nowrap" }}>
            <Link to={"/contact-us"}>Contact Us</Link>
          </li>
          <li className="clickOn">
            <FaUserCircle onClick={handleLi} />
            {show && (
              <ul onMouseLeave={handleLi}>
                {user ? (
                  <li style={{ whiteSpace: "nowrap" }}>
                    <Link className="log" to={"/add"}>
                      Add Blog
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link className="log" to={"/login"}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
