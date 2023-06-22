import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/quill.css"
import Editor from "jodit-react"
import { BiLoaderCircle } from "react-icons/bi"

const Add = () => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState()
  const navigate = useNavigate()
  const editorRef = useRef(null)
  const handlePic = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }
  const handleForm = async (e) => {
    const data = {
      title: e.target.title.value,
      coverPhoto: image,
      content: editorRef.current.value,
    }
    console.log(data)
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
        <h3 style={{ fontSize: "1.3ren" }}>Cover Photo</h3>
        <label>
          <input
            type="file"
            name="coverPhoto"
            onChange={handlePic}
            accept="image/*"
            style={{ display: "none" }}
          />
          {image ? (
            <div className="coverPhoto">
              <img src={image} />
            </div>
          ) : (
            <div className="setImage button" role="button">
              Set Image
            </div>
          )}
        </label>
        <input type="text" name="title" placeholder="Title" />
        <Editor ref={editorRef} />
        <button type="submit" className="button">
          Create a Blog
        </button>
      </form>
    </>
  )
}
export default Add
