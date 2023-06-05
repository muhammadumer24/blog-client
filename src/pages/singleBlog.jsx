import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BiLoaderCircle } from "react-icons/bi"
import axios from "axios"
export default () => {
  const [blogData, setBlogData] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  useEffect(() => {
    if (!params) {
      return console.log("nothing")
    }
    fetchData(params.title)
  }, [])
  const fetchData = async (title) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:2457/blog/${title}`)
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
          <div dangerouslySetInnerHTML={{ __html: blogData.content }}></div>
        </div>
      )}
    </>
  )
}
