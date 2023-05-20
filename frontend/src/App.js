import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Read from './pages/Read';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<Read />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
