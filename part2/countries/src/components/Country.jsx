const Country = ({name, onClick}) => {
  return (
    <div>
      {name} <button onClick={onClick}>show</button>
    </div>
  )
}

export default Country