import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import SingleTodo from "../components/SingleTodo";
import { Navigate } from "react-router-dom";


function Home() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [todos, setTodos] = useState([] );
	const [refresh, setRefresh] = useState(true);

	const { isAuthenticated } = useContext(Context);


	const updateHandler = async (id) => {
		console.log(id);
		try {
			await axios.put(
				`${server}/todo/editTodo/${id}`,
				{},
				{
					withCredentials: true,
				}
			);
			// toast.success(data.message);
			setRefresh((prev) => !prev);
		} catch (error) {
			toast.error(error.response.data.message);
		}
		toast.success(id);
	};

	const deleteHandler = async (id) => {
		try {
			await axios.delete(`${server}/todo/deleteTodo/${id}`, {
				withCredentials: true,
			});
			toast.success(data.message);
			setRefresh((prev)=>!prev);
		} catch (error) {
			toast.error(error.response.data.message);
		}
		// toast.error(id);
	};

	async function submitHandler(e) {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(
				`${server}/todo/createTodo`,
				{
					title: title,
					description: description,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			setTitle("");
			setDescription("");
			toast.success(data.message);
			setLoading(false);
			setRefresh((prev) => !prev);
		} catch (error) {
			toast.error(error.response.data.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		axios
			.get(`${server}/todo/getMyTodos`, {
				withCredentials: true,
			})
			.then((res) => {
				// console.log(res.data.data);
				// console.log(res);
				setTodos(res.data.data);
			})
			.catch((e) => {
				console.log(e);
				toast.error(e.response.data.message);
			});
	}, [refresh]);

	if (!isAuthenticated) {
		return (
			<Navigate to={'/login'}></Navigate>
		)
	}

	return (
		<div className="container">
			<div className="login">
				<section>
					<form onSubmit={submitHandler}>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Title"
							required
						/>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Description"
							required
						/>

						<button disabled={loading} type="submit">
							Add Task
						</button>
					</form>
				</section>
			</div>

			<section className="todosContainer">
				{todos.map((task) => (
					<SingleTodo
						key={task._id}
						todo={task}
						updateHandler={updateHandler}
						deleteHandler={deleteHandler}
					></SingleTodo>
				))}
			</section>
		</div>
	);
}

export default Home;
