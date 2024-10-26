const Notification = ({ text, type }) => {
  if (text) {
    return <div className={`message ${type}`}>{text}</div>
  }
    else return null
}

export default Notification