import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Recommendation from "./components/Recommendation";
import Genre from "./components/Genre";
import AnimeDetail from "./components/AnimeDetail";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import AnimeByGenre from "./components/AnimeByGenre";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:animeId" element={<AnimeDetail />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/genre/:id" element={<AnimeByGenre />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
