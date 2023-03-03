import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import About from "./pages/about/About";
import Accommodation from "./pages/accommodation/Accommodation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation/:id" element={<Accommodation />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
