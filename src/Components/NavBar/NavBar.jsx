import React, { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { RiGithubFill } from "react-icons/ri";
import { LuPhoneCall } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";

function Navbar() {

    const [sideBar, setsideBar] = useState(false);

    const handleClick = () => {
        setsideBar(true);
    };

    const handleClose = () => {
        setsideBar(false);
    };

    const handleLinkClick = () => {
        setsideBar(false);
    };

    const phoneNumber = "+8610715268";

    return (
        <div className="flex justify-between w-full bg-[#0C0C1D] py-4 px-5 text-white fixed shadow-2xl z-10">
            <div className="flex justify-center items-center gap-5">
                {/* Left Component */}
                <div className="bg-white rounded-full p-3">
                    <HiMenuAlt2
                        className="text-xl text-[#0C0C1D] cursor-pointer"
                        onClick={handleClick}
                    />
                </div>
                <div>
                    <h1 className="hidden md:block text-xl">Surendran B R</h1>
                </div>
            </div>
            {/* Right Component */}
            <div className="hidden md:flex gap-5 justify-center items-center mr-5">
                <a href="https://www.linkedin.com/in/surendran-prasanna-790343226/">
                    <FaLinkedinIn className="text-2xl" />
                </a>
                <a href="https://github.com/SurendranGithub">
                    <RiGithubFill className="text-2xl" />
                </a>
                <LuPhoneCall
                    className="text-2xl cursor-pointer"
                    onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                />
            </div>
            {/* Side Content */}
            <div
                id="SideBar"
                className={`fixed top-0 left-0 h-full bg-white shadow-2xl transform ${sideBar ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 w-[100vw] md:w-[25vw] z-20`}
            >
                <div className="flex justify-start mt-4 px-5">
                    <IoCloseCircle
                        className="text-black text-5xl cursor-pointer"
                        onClick={handleClose}
                    />
                </div>
                <div className="flex justify-center items-center flex-col gap-10 font-semibold text-black text-xl mt-10">
                    <h1 className="cursor-pointer" onClick={handleLinkClick}>
                        <a href="#HomeSection">Home</a>
                    </h1>
                    <h1 className="cursor-pointer" onClick={handleLinkClick}>
                        <a href="#ProjectSection">Projects</a>
                    </h1>
                    <h1 className="cursor-pointer" onClick={handleLinkClick}>
                        <a href="#ToolSection">About</a>
                    </h1>
                    <h1 className="cursor-pointer" onClick={handleLinkClick}>
                        <a href="#ContactSection">Contact</a>
                    </h1>
                </div>
                <div className="text-black flex justify-center gap-8 mt-10">
                    <a href="https://www.linkedin.com/in/surendran-prasanna-790343226/">
                        <FaLinkedinIn className="text-4xl" />
                    </a>
                    <a href="https://github.com/SurendranGithub">
                        <RiGithubFill className="text-4xl" />
                    </a>
                    <LuPhoneCall
                        className="text-4xl cursor-pointer"
                        onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
