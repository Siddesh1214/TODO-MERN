import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";


function App() {
	const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${server}/user/myProfile`, {
				withCredentials: true,
			})
			.then((res) => {
				setUser(res.data.user);
				setIsAuthenticated(true);
				setLoading(false);
			})
			.catch((error) => {
				setUser({});
				setIsAuthenticated(false);
				setLoading(false);
			});
	}, []);

	return (
		<Router>
			<Header></Header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />}></Route>
				<Route exact path="/register" element={<Register />}></Route>
				<Route exact path="/profile" element={<Profile />}></Route>
			</Routes>
			<Toaster></Toaster>
		</Router>
	);
}

export default App;
