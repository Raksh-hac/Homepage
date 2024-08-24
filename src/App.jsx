import React from "react";
import Navbar from "./assets/navbar";
import Cube from "./assets/cubes";
import Cards from "./assets/cards";
import Footer from "./assets/Footer";

export default function App() {
  return (
    <div 
      className="min-h-screen relative flex flex-col" 
      style={{
        backgroundColor: "#111111", // Solid background color
      }}
    >
      {/* Background flares */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1% 130%, rgba(255, 255, 255, 0.3), transparent 50%),
            radial-gradient(circle at 99% 130%, rgba(255, 255, 255, 0.3), transparent 50%)
          `,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <section
          className="self-stretch flex flex-row items-start justify-center py-0 pl-[1.625rem] pr-[1.25rem] box-border max-w-full mt-[-5%] mb-1 text-center text-neutral-200"
          style={{
            backgroundColor: "transparent", // Transparent background for the section
          }}
        >
          <div className="w-[40rem] flex flex-col items-start justify-start max-w-full">
            <h1 
              className="m-0 tracking-[0.1em] capitalize font-bold"
              style={{
                fontSize: '65px',
                fontWeight: 'bold',
                fontFamily: 'Calibri',
              }}
            >
              Innovate Fearlessly
            </h1>
            <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[4.187rem] pr-[4.687rem] box-border max-w-full text-[0.875rem]">
              <div className="flex-1 tracking-[0.08em] capitalize">
                <p className="[margin-block-start:0] [margin-block-end:4px]" style={{ fontSize: '14px', fontFamily: 'Calibri' }}>
                  <b>Game and Web Development</b>
                  <span className="font-light">{` for Visionary Creators. `}</span>
                </p>
                <p className="m-0" style={{ fontSize: '14px', fontFamily: 'Calibri' }}>
                  <span className="font-light">{`Explore Our Comprehensive Web and Game Development Services & Assets. `}</span>
                  <b>
                    Your One-Stop Shop for all your Game and Web Development
                    essentials
                  </b>
                  <span className="font-light">.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Cube />
        <Cards />
        <Footer />
      </div>
    </div>
  );
}
