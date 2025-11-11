import React from "react";
import food from "../assets/food.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../lip/supabaseClient";

export default function Addkinkun() {
  // สร้าง state เพื่อเก็บข้อมูล comoponent
  const [food_name, setFood_name] = useState("");
  const [food_where, setFood_where] = useState("");
  const [food_pay, setFood_pay] = useState("");
  const [foodFlie, setFoodfile] = useState(null);
  const [foodName, setFoodName] = useState("");

  //สร้างฟัวชั่นเลือกรูปและแสดงรูป
  const handkeSelectImageAndPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodfile(file);
      setFoodName(URL.createObjectURL(file));
    }
  };

  const warningAlert = (message) => {
    Swal.fire({
      icon: "warning",
      iconColor: "orange",
      title: message,
      showConfirmButton: true,
      confirmButtonText: "ตกลง",
      confirmButtonColor: "orange",
    });
  };
  const successAlert = (message) => {
    Swal.fire({
      icon: "success",
      iconColor: "orange",
      title: message,
      showConfirmButton: true,
      confirmButtonText: "ตกลง",
      confirmButtonColor: "orange",
    }).then(()=>{
      window.location.href = "/showallkinkun";
    });
  };

  const handleSaveCLick = async (e) => {
    e.preventDefault();
    // Validate ui
    if (food_name.trim().length === 0) {
      warningAlert("กรุณากรอกชื่ออาหาร ?");
      return;
    } else if (food_where.trim().length === 0) {
      warningAlert("กรุณากรอกสถานที่ที่กิน ?");
      return;
    } else if (food_pay === undefined || food_pay == "") {
      warningAlert("กรุณากรอกจำนวนเงินที่จ่าย ?");
      return;
    }
    //Upload รูปไปี่ storage ของ supabase
    let food_image_url = ""; //ตัวแปรเก็บ url ของรูปที่อัพโหลด
    if (foodFlie) {
      //ตรวจสอบว่าได้เลือกรูปหรือไม่
      //เปลี่ยนชื่อไฟล์ให้ไม่ซ้ำกัน
      const newFileName = Date.now() + "_" + foodFlie.name;
      //upload

      const { error } = await supabase.storage
        .from("kinkun_bk")
        .upload(newFileName, foodFlie);
      if (error) {
        warningAlert("เกิดข้อผิดพลาดในการอัพโหลดรูป กรุณาลองใหม่อีกครั้ง");
        return;
      }
      //in casesuccess go get url at strage form supabase เก็บในตัวแปร
      const { data } = await supabase.storage
        .from("kinkun_bk")
        .getPublicUrl(newFileName, foodFlie);
      food_image_url = data.publicUrl;
    }
    //และget urlของรูปที่ url ของ supabase มาเก็บไว้ในฐานข้อมูล

    //บันทึกข้อมูลการกินลงฐานข้อมูล
    const{error} = await supabase.from("Kinkun_tb").insert([{
      food_name: food_name,
      food_where: food_where,
      food_pay: food_pay,
      food_image_url: food_image_url
    }]) 
    if (error) {
        warningAlert("เกิดข้อผิดพลาดในการอัพโหลดรูป กรุณาลองใหม่อีกครั้ง");
        return;
      }
      successAlert("บันทึกข้อมูลเรียบร้อย").then(() => {});

    //redirect to showallkinkun page
  
    
  };
  //สร้างฟังก์ชั่นลบข้อมูลออกจาก table
  

  return (
    <div>
      <div className="w-10/12 mx-auto border-gray-300 p-6 shadow-md mt-20 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          Kinkun App (Supabase)
        </h1>
        <h1 className="text-2xl font-bold text-center text-blue-700">
          เพิ่มข้อมูลการกิน
        </h1>
        <img src={food} alt="กินกัน" className="mx-auto w-20 mt-5" />

        <form onSubmit={handleSaveCLick}>
          <div className="mt-5">
            <label>กินอะไร ? </label>
            <input
              value={food_name}
              onChange={(e) => setFood_name(e.target.value)}
              placeholder="เช่น Pizza , kfc , . . ."
              type="text"
              className="border border-gray-400 w-full p-2 mt-1 rounded"
            />
          </div>
          <div className="my-5">
            <label>กินที่ไหน ? </label>
            <input
              value={food_where}
              onChange={(e) => setFood_where(e.target.value)}
              placeholder="เช่น Pizza หนองแขม , kfc หน้ามอ , . . ."
              type="text"
              className="border border-gray-400 w-full p-2 mt-1 rounded"
            />
          </div>
          <div className="my-5">
            <label>กินไปเท่าไหร่ ? </label>
            <input
              value={food_pay}
              onChange={(e) => setFood_pay(e.target.value)}
              placeholder="เช่น 200 , 500.25 , . . ."
              type="number"
              className="border border-gray-400 w-full p-2 mt-1 rounded"
            />
          </div>
          <div className="my-5">
            <label>รูปกิน </label>
            <input
              onChange={handkeSelectImageAndPreview}
              type="file"
              className="hidden"
              id="selectImage"
              accept="image/*"
            />
            <label
              htmlFor="selectImage"
              className="py-2 px-4 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white rounded block w-30 text-center "
            >
              เลือกรูป
            </label>
            <div className="mt-3">
              {foodName && (
                <img src={foodName} alt="รูปที่เลือก" className="w-30" />
              )}
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 cursor-pointer rounded p-2 text-white"
            >
              บันทึกการกิน
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link to="/Showallkinkun" className=" hover:text-blue-700 ">
            กลับหน้าหลัก Kinkun App
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
