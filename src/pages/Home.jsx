import React from "react";
import food from "../assets/food.png";
import { IoLogoFacebook } from "react-icons/io";
import { FaLine } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [secureCode, setSecureCode] = useState("");

  const handleAccessAppCLick = () => {
    //validate secure code
    if (secureCode === "") {
      alert("กรุณาใส่รหัสเข้าใช้งาน");
      return;
    }
    if (secureCode.toUpperCase() === "SAU") {
      {
        navigate("/showallkinkun");
        //หรือ window.location.href = "/showallkinkun";
      }
    } else {
      alert("รหัสเข้าใช้งานไม่ถูกต้อง");
    }
  };

  return (
    <div>
      <div className="w-10/12 mx-auto border-gray-300 p-4 shadow-md mt-20 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          Kinkun APP (Supabase)
        </h1>
        <h1 className="text-2xl font-bold text-center text-blue-700">
          บันทึกการกิน
        </h1>
        <img src={food} alt="กินกัน" className="block mx-auto w-30 mt-5" />

        <input
          type="text"
          placeholder="Enter secure code"
          value={secureCode}
          onChange={(e) => setSecureCode(e.target.value)}
          className="p-3 border-gray-400 rounded-md mt-5 w-full"
        />
        <button
        onClick={handleAccessAppCLick}
          className="w-full bg-blue-700 p-3 rounded-md text-white 
        mt-5 hover:bg-blue-500 cursor-pointer"
        >
          เข้าใช้งาน
        </button>
        <div
          className="mt-5 flex justify-center gap-5"
          
        >
          <a href="#">
            <IoLogoFacebook className="text-2xl text-gray-700 hover:text-pink-300" />
          </a>
          <a href="#">
            <FaLine className="text-2xl text-gray-700 hover:text-pink-300" />
          </a>
          <a href="#">
            <FaSquareInstagram className="text-2xl text-gray-700 hover:text-pink-300" />
          </a>
          <a href="#">
            <FaSquareTwitter className="text-2xl text-gray-700 hover:text-pink-300" />
          </a>
          <a href="#">
            <FaGithubSquare className="text-2xl text-gray-700 hover:text-pink-300" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
