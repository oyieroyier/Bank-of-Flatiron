import React, { useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, setTransactions, search }) {
	const [sorting] = useState({
		date: -1,
		description: -1,
		category: -1,
		amount: -1,
	});
	let transactionList = "Loading...";

	if (transactions) {
		const filteredTransactions = transactions.filter((transaction) => {
			return transaction.description
				.toLowerCase()
				.includes(search.toLowerCase());
		});
		transactionList = filteredTransactions.map((transaction) => (
			<Transaction
				key={transaction.id}
				id={transaction.id}
				date={transaction.date}
				description={transaction.description}
				category={transaction.category}
				amount={transaction.amount}
			/>
		));
	}
	function updatesorting(item) {
		sorting[item] = sorting[item] * -1;
	}

	function sortTransactionList(event) {
		const sortBy = event.target.textContent.toLowerCase();
		updatesorting(sortBy);

		let transactionsCopy;

		if (sortBy === "category" || sortBy === "description") {
			transactionsCopy = [...transactions].sort((a, b) => {
				if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
					return sorting[sortBy];
				} else if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
					return sorting[sortBy] * -1;
				} else {
					return 0;
				}
			});
		} else if (sortBy === "amount") {
			transactionsCopy = [...transactions].sort((a, b) => {
				if (a.amount > b.amount) {
					return sorting.amount;
				} else if (a.amount < b.amount) {
					return sorting.amount * -1;
				} else {
					return 0;
				}
			});
		} else if (sortBy === "date") {
			transactionsCopy = [...transactions].sort((a, b) => {
				const timeA = new Date(a.date).getTime();
				const timeB = new Date(b.date).getTime();

				if (timeA > timeB) {
					return sorting.date;
				} else if (timeA < timeB) {
					return sorting.date * -1;
				} else {
					return 0;
				}
			});
		}

		setTransactions(transactionsCopy);
	}

	return (
		<table className="">
			<tbody>
				<tr>
					<th style={{ backgroundColor: "#999", cursor: "pointer" }}>
						<h3 className="" onClick={sortTransactionList} title="Sort by date">
							Date
						</h3>
					</th>
					<th style={{ backgroundColor: "#999", cursor: "pointer" }}>
						<h3
							className=""
							onClick={sortTransactionList}
							title="Sort by description"
						>
							Description
						</h3>
					</th>
					<th style={{ backgroundColor: "#999", cursor: "pointer" }}>
						<h3
							className=""
							onClick={sortTransactionList}
							title="Sort by category"
						>
							Category
						</h3>
					</th>
					<th style={{ backgroundColor: "#999", cursor: "pointer" }}>
						<h3
							className=""
							onClick={sortTransactionList}
							title="Sort by amount"
						>
							Amount
						</h3>
					</th>
					<th style={{ backgroundColor: "#999", cursor: "pointer" }}>
						<h3 className="" title="Sort by amount">
							Action
						</h3>
					</th>
				</tr>
				{transactionList}
			</tbody>
		</table>
	);
}

export default TransactionsList;
