"use client";

import Banner from "../banner/Banner";
import { DailySalesList } from "./DailySalesList";

// import { DailySalesList } from "./dailylists/DailySalesList";
export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Banner />
      <div className="flex flex-col gap-4 justify-center items-center bg-pink-100 p-2 rounded-lg">
        {/* <h1 className="text-4xl font-bold gradient-text uppercase">Daily Sales</h1> */}
        <img src="https://bachlongmobile.com/_next/image/?url=https%3A%2F%2Fbeta-api.bachlongmobile.com%2Fmedia%2Fdailysalebanner%2F2025-02-14_17-09-24-103.png&w=3840&q=75" 
        alt="banner"
        className="w-full h-auto object-contain" 
        />
        <DailySalesList />
      </div>
    </div>
  );
}
