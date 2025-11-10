import React from "react";
import food from "../assets/food.png";
import { IoLogoFacebook } from "react-icons/io";
import { FaLine } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <div className="w-10/12 mx-auto border-gray-300 p-4 shadow-md my-10 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          Kinkun APP (Supabase)
        </h1>
        <h1 className="text-2xl font-bold text-center text-blue-700">
          บันทึกการกิน
        </h1>
        <img src={food} alt="กินกัน" className="block mx-auto w-30 mt-5" />

        <input
          type="text"
          placeholder="Enter secure code
        "
          className="p-3 border-gray-400 rounded-md mt-5 w-full"
        />
        <button className="w-full bg-blue-700 p-4 rounded-md text-white mt-5">
          เข้าใช้งาน
        </button>
        <div className="mt-5 flex justify-center gap-5">
          <a href="#">
            <IoLogoFacebook className="text-2xl text-gray-700" />
          </a>
          <a href="#">
            <FaLine className="text-2xl text-gray-700" />
          </a>
          <a href="#"><FaSquareInstagram className="text-2xl text-gray-700"/></a>
          <a href="#"><FaSquareTwitter className="text-2xl text-gray-700" /></a>
          <a href="#"><FaGithubSquare className="text-2xl text-gray-700" /></a>
        </div>
      </div>
    </div>
  );
}
