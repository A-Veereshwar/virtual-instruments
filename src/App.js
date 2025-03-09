import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultHome from "./DefaultHome";
import KeyboardPiano from "./KeyboardPiano";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultHome />} />
        <Route path="/virtual-instruments" element={<Navigate to="/" />} />
        <Route path="/piano" element={<KeyboardPiano />} />
      </Routes>
    </Router>
  );
}

export default App;
