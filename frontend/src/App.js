import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
function App() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
