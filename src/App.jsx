import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Roulette } from "./components/Roulette";
import { QuestionsTeatroCordoba } from "./components/Questions/QuestionsTeatroCordoba.jsx";
import { QuestionsTeatroIndependienteCordoba } from "./components/Questions/QuestionsTeatroIndependienteCordoba.jsx";
import { QuestionsTeatroCirulaxia } from "./components/Questions/QuestionsTeatroCirulaxia.jsx";

import "./Style/style.scss"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/questions/teatro-cordoba" element={<QuestionsTeatroCordoba/>}/>
          <Route path="/questions/teatro-independiente-cordoba" element={<QuestionsTeatroIndependienteCordoba />} />
          <Route path="/questions/teatro-cirulaxia" element={<QuestionsTeatroCirulaxia />} />
          <Route path="*" element={<Navigate to="/roulette" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;