import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import "../css/blog.css"
import { BiLoaderCircle } from "react-icons/bi"
export default () => {
  const [blogData, setBlogData] = useState()
  const [loading, setLoading] = useState(false)
  const navigateUser = useNavigate()
  const getData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("http://localhost:2457/getData")
      setBlogData(data)
      setLoading(false)
    } catch (error) {
      alert(
        error.response
          ? error.response.data
          : "Something went wrong. Please try again later"
      )
      setLoading(false)
    }
  }
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === "/blogs") {
      getData()
    }
  }, [])
  const handleBlog = (e) => {
    navigateUser(`${e.currentTarget.dataset.title.replace(/ /g, "-")}`)
  }
  return (
    <>
      {loading && <BiLoaderCircle className="loading" />}
      <div className="blogs">
        {blogData &&
          blogData.map((item, index) => {
            return (
              <div
                className="blog"
                key={index}
                data-title={item.title}
                onClick={handleBlog}
              >
                <div className="title">{item.title}</div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></div>
              </div>
            )
          })}
      </div>
    </>
  )
}
