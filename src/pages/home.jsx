import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../css/blog.css"
import image from "../images/Screenshot (9).png"
import { BiLoaderCircle } from "react-icons/bi"
const Home = () => {
  const [blogData, setBlogData] = useState("")
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigateUser = useNavigate()
  const getData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("http://localhost:2457/getData")
      setReload(false)
      setBlogData(data)
      setLoading(false)
    } catch (error) {
      alert(
        error.response
          ? error.response.data
          : "Something went wrong. Please try again later"
      )
      setLoading(false)
      setReload(true)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const handleBlog = (e) => {
    navigateUser(`${e.currentTarget.dataset.id}`)
  }
  return (
    <>
      {loading && <BiLoaderCircle className="loading" />}
      {reload && (
        <div className="reload">
          <button type="button" onClick={getData}>
            Reload
          </button>
        </div>
      )}
      <div className="container">
        <div className="item item1">
          <img src={image} alt="picture" />
          <h2 className="title">This is a title</h2>
        </div>
        <div className="item item2">
          <img src={image} alt="picture" />
          <h2 className="title">This is a title</h2>
        </div>
        <div className="item item3">
          <img src={image} alt="picture" />
          <h2 className="title">This is a title</h2>
        </div>
        <div className="item item4">
          <img src={image} alt="picture" />
          <h2 className="title">This is a title</h2>
        </div>
        <div className="item item5">
          <img src={image} alt="picture" />
          <h2 className="title">This iasdfsaflllllllldasdfasfs a title</h2>
        </div>
      </div>
      {/* <div className="blogs">
        {blogData &&
          blogData.map((item, index) => {
            return (
              <div
                className="blog"
                key={index}
                data-id={item._id}
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
      </div> */}
    </>
  )
}
export default Home
