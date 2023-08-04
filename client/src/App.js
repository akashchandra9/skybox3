import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Detail from './components/detail';
import Forget from "./components/forget";
import Pass from "./components/pass"
import Updo from "./components/updo"
import Down from "./components/down"
import Index from "./components/index"
function App() {
	
return (
	<>
	<BrowserRouter>
	<Routes>
		<Route exact path="/" element={<Index/>}/>
		<Route exact path="/login" element={<Login/>}/>
		<Route exact path="/register" element={<Register/>}/>
		<Route exact path="/detail" element={<Detail/>}/>
		<Route path="/forget" element={<Forget/>}/>
		<Route path="/pass" element={<Pass/>}/>
		<Route path="/updo" element={<Updo/>}/>
		<Route path="/down" element={<Down/>}/>
	</Routes>
	</BrowserRouter>
	</>
);
}

export default App;
