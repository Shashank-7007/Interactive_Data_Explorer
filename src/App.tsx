import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="bg-white shadow px-6 py-4 flex gap-6">
        <Link to="/" className="text-blue-600 font-semibold">Home</Link>
        <Link to="/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
