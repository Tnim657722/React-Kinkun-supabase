import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Showallkinkun from "./pages/Showallkinkun";
import Addkinkun from "./pages/Addkinkun";
import Editkinkun from "./pages/Editkinkun";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/showallkinkun" element={<Showallkinkun/>}/>
         <Route path="/addkinkun" element={<Addkinkun/>}/>
         <Route path="/editkinkun/:id" element={<Editkinkun/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
