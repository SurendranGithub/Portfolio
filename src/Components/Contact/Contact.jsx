import React, { useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import AOS from "aos"
import 'aos/dist/aos.css'

function Contact() {
    const phoneNumber = "+8610715268";

    const handleEmailCheck = () => {
        window.location.href = "mailto:surendran210703@gmail.com";
    };
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div id="ContactSection" className="bg-[#0C0C1D] text-white flex justify-center items-center py-[120px] flex-col" data-aos="fade-up">
            <h1 className="text-3xl text-[#FFE31A] mb-10 md:text-7xl">Let's connect together</h1>
            <div className="flex gap-10 items-center justify-center flex-col">
                <div className="flex justify-center items-center gap-3">
                    <CiMail className="text-3xl" onClick={handleEmailCheck} />
                    <span className="text-xl md:text-2xl">surendran210703@gmail.com</span>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <FaPhoneAlt
                        className="text-2xl"
                        onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                    />
                    <span className="text-xl md:text-2xl">+91 8610715268</span>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <FaHome className="text-3xl" />
                    <span className="text-xl md:text-2xl">Tiruchirappalli, Tamil Nadu, India.</span>
                </div>
            </div>
        </div>
    );
}

export default Contact;
