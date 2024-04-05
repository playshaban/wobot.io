import './App.css'
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Header from './components/Header';
import Home from  "./pages/Home";
import Details from './pages/Details';
function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/details/" element={<Details />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
