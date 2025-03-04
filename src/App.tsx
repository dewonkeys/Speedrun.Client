// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import "./App.css";
import { SRSystems } from "./pages/SRSystems";
import { SRSegments } from "./pages/SRSegments";
import { SRStrains } from "./pages/SRStrains";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SRSystems />} />
          <Route path="/system/:id" element={<SRStrains />} />
          <Route path="/strain/:id" element={<SRSegments />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
