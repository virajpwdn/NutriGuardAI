"use client";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    window.location.href = "/diet-plan";
  }, []);
  return <div>page</div>;
};

export default page;
