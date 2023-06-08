import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Cabinet from "./pages/cabinet/Cabinet";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/cabinet/*" element={<Cabinet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
