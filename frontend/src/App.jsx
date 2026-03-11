import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddTask from "./components/AddTask";
import List from "./components/List";
import UpdateTask from "./components/UpdateTask";
import SignUp from "./components/signUp";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Protected><List /></Protected>} />
        <Route path="/add" element={<Protected><AddTask /></Protected>} />
        <Route path="/update/:id" element={<Protected><UpdateTask /></Protected>} />

        {/* Add these two */}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;