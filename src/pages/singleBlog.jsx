import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BiLoaderCircle } from "react-icons/bi"
import axios from "axios"
const Blog = () => {
  const [blogData, setBlogData] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  useEffect(() => {
    fetchData(params.id)
  }, [params])
  const fetchData = async (id) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:2457/blog/${id}`)
      setBlogData(data)
      setLoading(false)
    } catch (err) {
      alert(
        err.response
          ? err.response.message
          : "Sorry Something Went Wrong. Please try again later!"
      )
      setLoading(false)
      console.log(err)
    }
  }
  return (
    <>
      {loading && <BiLoaderCircle className="loading" />}
      {blogData && (
        <div className="showBlog">
          <h2 className="title">{blogData.title}</h2>
          <img src={blogData.coverPhoto} alt="blogCoverPhoto" />
          <div dangerouslySetInnerHTML={{ __html: blogData.content }}></div>
        </div>
      )}
    </>
  )
}
export default Blog
