import React, { useEffect } from "react";
import { FaHandPeace } from "react-icons/fa6";
import AOS from "aos"
import 'aos/dist/aos.css'

function Home() {
    const handleClick = () => {
        window.location.href =
            "https://drive.google.com/file/d/1JgJEVSXzsN0aE-8w3qF9PkDS42OPGPln/view?usp=sharing";
    };

    const handleClick2 = () => {
        window.location.href =
            "https://github.com/SurendranGithub?tab=repositories";
    };
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div id="HomeSection" className="h-screen text-white flex justify-center items-center text-center px-4" data-aos="fade-up">
            <div className="flex flex-col gap-6">
                <div className="flex justify-center font-light">
                    <h4 className="text-xl md:text-4xl tracking-widest text-gray-400">Hii there!! </h4>
                    <FaHandPeace className="self-center ml-3 text-2xl text-[#FFE31A]" />
                </div>
                <h1 className="text-6xl md:text-9xl">I'm <span className="font-bold font-dancing">Surendran</span></h1>
                <p className="md:text-lg max-w-[700px] text-gray-400">A design-focused Front-End Developer, merging visual finesse with technical expertise to craft captivating digital experiences.</p>
                <div className="flex gap-5 justify-center items-center flex-col sm:flex-row mt-5">
                    <button className="h-[50px] w-[200px] bg-white text-black"
                        onClick={handleClick}
                    >Check out Resume!</button>
                    <button className="h-[50px] w-[200px] border-2 border-white bg-transparent"
                        onClick={handleClick2}>Explore my works</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
