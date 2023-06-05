import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/quill.css"
import Editor from "jodit-react"
import { BiLoaderCircle } from "react-icons/bi"

export default () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const editorRef = useRef(null)
  const handleForm = async (e) => {
    const data = {
      title: e.target.title.value,
      content: editorRef.current.value,
    }
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("You are not authorized")
        window.location.pathname = "/"
      }
      setLoading(true)
      const post = await axios.post(
        "http://localhost:2457/add",
        { ...data },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      alert(post.response ? post.response.data : "Success")
      setLoading(false)
      navigate("/")
    } catch (error) {
      setLoading(false)
      console.log(error)
      alert(
        error.response
          ? error.response.data
          : "Something went wrong. Please try again later"
      )
    }
  }
  return (
    <>
      {loading && <BiLoaderCircle className="loading" />}
      <form onSubmit={handleForm} className="form">
        <h2>Add a Blog Post</h2>
        <input type="text" name="title" placeholder="Title" />
        <Editor ref={editorRef} />
        <button type="submit">Create a Blog</button>
      </form>
    </>
  )
}
