'use client'
import { BowlFoodIcon, CameraIcon } from "@phosphor-icons/react";
import React from "react";

const page = () => {
  const dummy = [
    {
      title: "Keto Diet Plan",
      date: "2 days ago",
      icon: "📝",
    },
    {
      title: "Keto Diet Plan",
      date: "2 days ago",
      icon: "📝",
    },
    {
      title: "Keto Diet Plan",
      date: "2 days ago",
      icon: "📝",
    },
    {
      title: "Keto Diet Plan",
      date: "2 days ago",
      icon: "📝",
    },
  ];
  return (
    <div className="h-screen w-screen flex">
      <div className="sidebar w-60 bg-[#F8F8F8] h-full border-r border-[rgb(222,222,222)] px-6 relative max-md:hidden">
        <div className="logo">
          <h1 className="text-lg font-bold py-3">NutriGuardAI</h1>
        </div>
        <div className="recent-plans border-t border-[#DEDEDE]">
          <button className="py-2 cursor-pointer! bg-[#044a05] rounded-sm text-white mt-5 w-full hover:shadow-lg hover:bg-[#21421e] hover:transition-all duration-150">
            New Diet Plan
          </button>
          <p className="text-sm my-4">Recent Plans</p>
          <div>
            {dummy.map((diet, idx) => {
              return (
                <div key={idx} className="flex gap-2">
                  <div className="icon text-lg">{diet.icon}</div>
                  <div className="diet-name">
                    <h3 className="text-lg text-zinc-900">{diet.title}</h3>
                    <p className="text-sm text-zinc-400">{diet.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="user-details absolute bottom-5 border-t border-[#DEDEDE] pt-2">
          <div className="flex gap-2 items-center">
            <div className="logo">
              <div className="h-10 w-10 rounded-full bg-blue-500"></div>
            </div>
            <div className="details">
              <h3 className="text-sm font-semibold">Christiano</h3>
              <p className="text-xs">Christiano@mail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container w-full h-full">
        <div className="flex gap-5 items-center justify-center w-full h-full max-md:flex-col">
          <div
            className="bg-gray-100 p-5 w-87.5 rounded-md
          "
          >
            <BowlFoodIcon size={32} />
            <h1 className="text-lg font-semibold">Build a Diet Plan</h1>
            <p className="text-sm py-5">
              Get AI-Powered Personalized diet plans based on your goals and
              preferrences
            </p>
            <button className="px-4 py-2 bg-blue-600 w-full text-white rounded-md cursor-pointer">
              Get Started
            </button>
          </div>
          <div className="bg-gray-100 p-5 w-87.5 rounded-md">
            <CameraIcon size={32} />
            <h1 className="text-lg font-semibold">Scan Ingredients</h1>
            <p className="text-sm py-5">
              Get AI-Powered Personalized diet plans based on your goals and
              preferrences
            </p>
            <button className="px-4 py-2 w-full text-white bg-blue-600 rounded-md cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
