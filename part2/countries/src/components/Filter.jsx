const Filter = ({filter, handleFilterChange}) => {
  return <p>find countries <input value={filter} onChange={handleFilterChange}/></p>
}

export default Filter