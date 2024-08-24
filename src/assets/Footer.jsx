import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-4">
        {/* First Column */}
        <div className="flex flex-col space-y-2">
          <a href="#" className="text-left text-[14px]">
            Home
          </a>
          <a href="#" className="text-left text-[14px]">
            Services
          </a>
        </div>

        {/* Second Column */}
        <div className="flex flex-col space-y-2">
          <a href="#" className="text-left text-[14px]">
            Services
          </a>
          <a href="#" className="text-left text-[14px]">
            Game Designing
          </a>
          <a href="#" className="text-left text-[14px]">
            Game Development
          </a>
          <a href="#" className="text-left text-[14px]">
            Web Development
          </a>
          <a href="#" className="text-left text-[14px]">
            Front-End Development
          </a>
        </div>

        {/* Third Column */}
        <div className="flex flex-col space-y-2 text-center">
          <a href="#" className="text-[14px]">
            Asset Store
          </a>
          <a href="#" className="text-[14px]">
            Game Store
          </a>
          <a href="#" className="text-[14px]">
            Web Store
          </a>
        </div>

        {/* Fourth Column */}
        <div className="flex flex-col space-y-2">
          <a href="#" className="text-left text-[14px]">
            About Us
          </a>
          <a href="#" className="text-left text-[14px]">
            Contact Us
          </a>
        </div>

        {/* Fifth Column */}
        <div className="flex flex-col space-y-4 items-end">
          <div className="flex items-center space-x-2">
            <span className="text-[12px]">@companyName</span>
            <img
              src="/Instagram_x2.svg" 
              alt="Company Logo"
              className="w-[30px] h-[30px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[12px]">Companyname@facebook.com</span>
            <img
              src="/Facebook1_x2.svg" 
              alt="Company Logo"
              className="w-[30px] h-[30px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[12px]">@companyName</span>
            <img
              src="/X1_x2.svg" 
              alt="Company Logo"
              className="w-[30px] h-[30px]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-[10px] mt-8">
        Copyright ©. All rights reserved, {`{Company Name}`} and {`{Company Name Logo}`}
      </div>
    </footer>
  );
};

export default Footer;
