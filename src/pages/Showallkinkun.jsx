import React from "react";
import food from "../assets/food.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../lip/supabaseClient";

export default function Showallkinkun() {
  const [kinkuns, setKinkuns] = useState([]);

  useEffect(() => {
    try {
      //โค้ดจะทำงานเมื่อมี effect เกิดขึ้นกับ component
      //ดึงข้อมูลการกินทั้งหมดจาก supabase
      const fetchKinkuns = async () => {
        const { data, error } = await supabase
          .from("Kinkun_tb")
          .select("*")
          .order("created_at", { ascending: false });
        //ดึงมาแล้วตรวจสอบ error
        if (error) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
            text: error.message,
          });
          console.log("Fecth error :", error);
        } else {
          setKinkuns(data);
        }
      };
      //เรียกใช้ฟังก์ชันดึงข้อมูล
      fetchKinkuns();
    } catch (ex) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        text: error.message,
      });
      console.log("Fecth error :", ex);
    }
  }, []);

  return (
    <div>
      <div className="w-10/12 mx-auto border-gray-300 p-6 shadow-md mt-20 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          Kinkun App (Supabase)
        </h1>
        <h1 className="text-2xl font-bold text-center text-blue-700">
          ข้อมูลบันทึกการกิน
        </h1>
        <img src={food} alt="กินกัน" className="mx-auto w-20 mt-5" />
        {/*ส่วนแสดงปุ่มเพิ่ม เพื่อเปิดหน้าจอ /allkinkun*/}

        <div className="my-8 flex justify-end">
          <Link
            to="/addkinkun"
            className="bg-blue-700 p-3 rounded 
                              hover:bg-blue-800 text-white "
          >
            เพิ่มกินกัน
          </Link>
        </div>

        {/*ส่วนแสดงข้อมูลการกินทั้งหมดที่ดึงมาจาก supabase โดยแสดงเป็นตาราง*/}
        <table className="w-full border border-gray-800 text-sm ">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-700 p-2">รูป</th>
              <th className="border border-gray-700 p-2">กินอะไร</th>
              <th className="border border-gray-700 p-2">กินที่ไหน</th>
              <th className="border border-gray-700 p-2">กินไปเท่าไหร่</th>
              <th className="border border-gray-700 p-2">วันไหน</th>
              <th className="border border-gray-700 p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {kinkuns.map((kinkun) => (
              <tr key={kinkun.id}>
                <td className="border border-gray-700 p-2 text-center">
                  {kinkun.food_image_url == " " ||
                  kinkun.food_image_url == null ? (
                    "-"
                  ) : (
                    <img
                      src={kinkun.food_image_url}
                      alt="รูปอาหาร"
                      className="w-20"
                    />
                  )}
                </td>
                <td className="border border-gray-700 p-2">
                  {kinkun.food_name}
                </td>
                <td className="border border-gray-700 p-2">
                  {kinkun.food_where}
                </td>
                <td className="border border-gray-700 p-2">
                  {kinkun.food_pay}
                </td>
                <td className="border border-gray-700 p-2">
                  {new Date(kinkun.created_at).toLocaleDateString("th-TH")}
                </td>
                <td className="border border-gray-700 p-2">แก้ไข | ลบ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
