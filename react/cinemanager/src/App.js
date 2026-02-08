import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home.jsx";
import Logon from './Components/Pages/Logon.jsx';
import Register from './Components/Pages/Register.jsx';
import Logoff from './Components/Pages/Logoff.jsx';
import Movies from './Components/Pages/Movies.jsx';
import AdminNewMovie from './Components/Pages/AdminNewMovie.jsx';
import AdminMovieList from './Components/Pages/AdminMovieList.jsx';
import AdminEditMovie from './Components/Pages/AdminEditMovie.jsx';
import OneMovie from './Components/Pages/OneMovie.jsx';
function App() {
  window.sessionStorage.setItem("LOGIN", "0");
  return (
  <BrowserRouter className="App">
    <Routes>
      
      <Route index element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/logon" element={<Logon></Logon>}></Route>
      <Route path="/logoff" element={<Logoff></Logoff>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/movies" element={<Movies></Movies>}></Route>
      <Route path="/movie/:movie_id" element={<OneMovie></OneMovie>}></Route>
      <Route path="/adminnewmovie" element={<AdminNewMovie></AdminNewMovie>}></Route>
      <Route path="/adminmovielist" element={<AdminMovieList></AdminMovieList>}></Route>
      <Route path="/admineditmovie/:movie_id" element={<AdminEditMovie></AdminEditMovie>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
