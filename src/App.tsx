import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/tv' element={<Tv />}></Route>
				<Route path='/seasrc' element={<Search />}></Route>
			</Routes>
		</>
	);
}

export default App;
