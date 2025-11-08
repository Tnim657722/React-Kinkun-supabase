import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Showallkinkun from "./pages/Showallkinkun";
import Addkinkun from "./pages/Addkinkun";
import Editkinkun from "./pages/Editkinkun";

export default function App() {
  return (
    <div>
      <browserRouter>
        <Routes>
         <Routh path="/" element={<Home/>}/>
         <Routh path="/showallkinkun" element={<Showallkinkun/>}/>
         <Routh path="/addkinkun" element={<Addkinkun/>}/>
         <Routh path="/editkinkun/:id" element={<Editkinkun/>}/>
        </Routes>
      </browserRouter>
    </div>
  );
}
