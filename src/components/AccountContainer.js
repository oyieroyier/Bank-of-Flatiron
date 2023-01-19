import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
	const [transactions, setTransactions] = useState([]);

	const [search, setSearch] = useState("");

	useEffect(() => {
		fetch("https://flatiron.vercel.app/transactions")
			.then((response) => response.json())
			.then((data) => setTransactions(data));
	}, []);

	function updatedTransactions(newTransactions) {
		const updatedTransactionsArray = [...transactions, newTransactions];
		setTransactions(updatedTransactionsArray);
	}

	return (
		<div className="mainn">
			<div className="table-stuff">
				<TransactionsList
					transactions={transactions}
					setTransactions={setTransactions}
					search={search}
				/>
			</div>
			<div className="one-container">
				<Search search={search} setSearch={setSearch} />
				<AddTransactionForm newData={updatedTransactions} />
			</div>
		</div>
	);
}

export default AccountContainer;
