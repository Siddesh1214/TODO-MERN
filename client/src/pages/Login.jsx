import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";



function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(Context);

	async function submitHandler(e) {
		e.preventDefault();
		setLoading(true);
		try {
			console.log(email, password);
			const { data }=await axios.post(
				`${server}/user/login`,
				{
					email: email,
					password: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			toast.success(data.message);
			setIsAuthenticated(true);
			setLoading(false);
		} catch (error) {
			toast.success("some error");
			console.log(error);
			setIsAuthenticated(false);
			setLoading(false);
		}
	}


	if (isAuthenticated) {
		return (
			<Navigate to={'/'}></Navigate>
		)
	}
	return (
		<div className="login">
			<section>
				<form onSubmit={submitHandler}>
				<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
					<button disabled={loading} type="submit">Login</button>
					<h4>Or</h4>
					<Link to="/register">Sign Up</Link>
				</form>
			</section>
		</div>
	);
}

export default Login;
