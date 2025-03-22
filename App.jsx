import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/overview" element={<OverView />} />
      </Routes>
    </Router>
  );
}

export default App;
