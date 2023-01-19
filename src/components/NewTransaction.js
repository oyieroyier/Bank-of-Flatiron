import React, { useState } from "react";
import { validateForm } from "./SortTransactions";

function NewTransaction({ newData }) {
	const [formData, setFormData] = useState({
		date: "",
		description: "",
		category: "",
		amount: "",
	});
	function handleSubmit(e) {
		e.preventDefault();
		const formInput = validateForm(formData);

		if (formInput.containsEmptyInput) {
			alert("Please fill in all inputs");
		} else if (formInput.hasInvalidDate) {
			alert(
				"Please choose a Year between 2000 and today"
			);
		} else if (!formInput.isInvalid) {
			fetch("https://api.npoint.io/1a81959eb42f2050e8cc/transactions/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((r) => r.json())
				.then((data) => newData(data));
			alert("Added ✔️");
		}
		setFormData("");
	}

	function handleChange(e) {
		e.preventDefault();
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
		console.log(formData);
	}
	return (
		<div className="search-box">
			<form onSubmit={handleSubmit} className="">
				<div className="fom">
					<input
						type="text"
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="category"
						placeholder="Category"
						value={formData.category}
						onChange={handleChange}
					/>
					<input type="date" name="date" onChange={handleChange} />
					<input
						type="number"
						name="amount"
						placeholder="Amount"
						value={formData.amount}
						onChange={handleChange}
					/>
					<button className="" type="submit">
						Add Transaction
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewTransaction;
