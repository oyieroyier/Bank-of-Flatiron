import React from "react";

function Search({search, setSearch}) {
  function handleSearch(event){
    setSearch(event.target.value)
  } 
  
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Transactions"
        value={search}
        onChange={handleSearch}
      />
      <i className=""></i>
    </div>
  );
}

export default Search;
