import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "../pages/Login";

// import { isAuthenticated } from '../../../server/middlewares/auth';

function Header() {
	const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(Context);
	// console.log(isAuthenticated, setIsAuthenticated);
	console.log(isAuthenticated);

  async function logoutUser() {
    setLoading(true);
		try {
			await axios.get(`${server}/user/logout`, {
				withCredentials: true,
			});

			toast.success("Logged Out Successfully");
			setIsAuthenticated(false);

      setLoading(false);
		} catch (error) {
      setIsAuthenticated(false);
			toast.error(error);
      setLoading(false);
		}
	}

	return (
		<nav className="header">
			<div>
				<h2>ToDo App.</h2>
			</div>
			<article>
				<Link to={"/"}>Home</Link>
				<Link to={"/profile"}>Profile</Link>

				{isAuthenticated ? (
					<button disabled={loading} onClick={logoutUser} className="btn">
						Logout
					</button>
				) : (
					<Link to={"/login"}>Login</Link>
				)}
			</article>
		</nav>
	);
}

export default Header;
