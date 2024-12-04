import React, { useEffect } from 'react';
import AOS from "aos"
import 'aos/dist/aos.css'

function Projects() {
    const source = [
        {
            name: "Restaurant Website",
            description:
                "A web-based system for managing restaurant operations, including order processing, menu management, and billing. Developed with HTML, CSS, and JavaScript, this project provides an intuitive interface for both customers and staff. It streamlines ordering, payment, and inventory management to improve overall restaurant efficiency and customer experience.",
            img: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732357037/resturant_xbaslm.png",
            url: "https://restaurant-app-ss.netlify.app/",
            repoUrl: "https://github.com/SurendranGithub/Restaurant.git",
        },
        {
            name: "College Management",
            description:
                "A Python-based College Management System that automates administrative tasks like student enrollment, faculty management, and course allocation. Built with Python and SQLite3, it offers a user-friendly interface to efficiently manage academic records and streamline administrative processes, improving operational efficiency for educational institutions.",
            img: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732357094/college_lppiz1.png",
            url: "https://github.com/SurendranGithub/CollegeManagement.git",
            repoUrl: "https://github.com/SurendranGithub/CollegeManagement.git",
        },
        {
            name: "Music Website",
            description:
                "A React-based Spotify clone that replicates the music streaming app's UI and functionality. The project focuses on building a responsive, interactive interface with features like song browsing, playlist creation, and a music player. It demonstrates proficiency in React and component-based architecture for dynamic web applications.",
            img: "https://res.cloudinary.com/dkks5xf5v/image/upload/v1732357127/music_il3ftj.png",
            url: "https://music-website21.netlify.app/",
            repoUrl: "https://github.com/SurendranGithub/spotify-clone.git",
        },
    ];

    const handleChange = (link) => {
        window.open(link, '_blank'); // Opens link in a new tab
    };
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div id='ProjectSection' className="px-6 py-10" >
            <h1 className="text-[#FFE31A] text-4xl md:text-6xl text-center mb-14 tracking-wide">Featured Works</h1>
            <div>
                {source.map((project, id) => (
                    <div key={id} className="flex flex-col md:flex-row mb-[100px] gap-7 md:px-24 hover:shadow-2xl duration-75 ease-in" data-aos="fade-right" >
                        <img src={project.img} alt={project.name} className="w-full h-48 md:w-auto md:h-64 object-cover rounded-xl" />
                        <div className="p-4 flex flex-col gap-4">
                            <h2 className="text-white text-2xl font-bold mb-2">{project.name}</h2>
                            <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                            <div className="flex gap-9">
                                <button
                                    onClick={() => handleChange(project.url)}
                                    className="py-2 px-4 w-[120px] bg-white text-black font-bold"
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => handleChange(project.repoUrl)}
                                    className="py-2 px-4 w-[120px] text-white border-2 border-white bg-transparent font-bold"
                                >
                                    View Repo
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;
