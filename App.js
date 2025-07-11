import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import MoviePage from "./pages/MoviePage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout"; // Optional: Navbar/footer wrapper

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
