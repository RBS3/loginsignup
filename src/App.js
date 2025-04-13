import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        
      </Routes>
    </Router>
  );
}
export default App;
