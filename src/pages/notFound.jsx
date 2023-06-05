export default (props) => {
  const { userName } = props
  const url = location.pathname
  return <h1>Sorry we cannot found {url.slice(1)}</h1>
}
