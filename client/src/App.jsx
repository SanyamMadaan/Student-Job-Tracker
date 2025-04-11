import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Addjob from "./components/Addjob";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/addjob" element={<Addjob/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
