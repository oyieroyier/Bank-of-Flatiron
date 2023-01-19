import React from "react";

function Search({ search, setSearch }) {
	function handleSearch(event) {
		setSearch(event.target.value);
	}

	return (
		<div className="search-box searching">
			<input
				type="text"
				placeholder="Transactions"
				value={search}
				onChange={handleSearch}
			/>
			<button type="submit">
				<i class="fa-solid fa-magnifying-glass"></i>
			</button>
		</div>
	);
}

export default Search;
