import React, { useEffect } from "react";
import AOS from "aos"
import 'aos/dist/aos.css'

function Tools() {
    const source = [
        {
            name: "C",
            url: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732516350/c_jhdcu2.png",
        },
        {
            name: "Java",
            url: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732516372/java_uyrly4.png",
        },
        {
            name: "HTML",
            url: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732516387/html5-png-image-10_kpmvhq.png",
        },
        {
            name: "CSS",
            url: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732516401/css_c8kqa7.png",
        },
        {
            name: "JavaScript",
            url: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732516423/js_z9qdno.png",
        },
        {
            name: "Figma",
            url: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732516442/figma_jf6hyc.png",
        },
    ];
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div id="ToolSection" className=" py-10 px-4">
            <div className="text-center mb-10" data-aos="fade-up">
                <h1 className="md:text-7xl text-4xl text-[#FFE31A]">Tools & Expertise</h1>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                    Presenting my curated selection of essential design tools and frontend skills for crafting compelling digital experiences.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6" data-aos="fade-up">
                {source.map((skill, id) => (
                    <div
                        key={id}
                        className="bg-[#3D3D4A] min-w-[120px] px-5 py-7 rounded-xl flex flex-col items-center justify-center hover:shadow-lg hover:bg-[#3e3e4b] hover:-translate-y-4 transition duration-300"
                    >
                        <img src={skill.url} alt={skill.name} className="w-12 h-12 mb-4" />
                        <h4 className="text-white text-sm font-medium">{skill.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tools;
