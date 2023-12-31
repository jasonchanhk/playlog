import React from 'react';
import { FaBasketballBall, FaVolleyballBall, FaFootballBall } from "react-icons/fa";
import { IconContext } from "react-icons";

const Intro: React.FC = () => {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                <span>PlayLog.</span>
            </h1>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
                <IconContext.Provider value={{ className: 'inline-block text-4xl mr-4' }}>
                    <FaBasketballBall />
                </IconContext.Provider>
                <IconContext.Provider value={{ color: 'Gainsboro' ,className: 'inline-block text-4xl mr-4' }}>
                    <FaVolleyballBall /><FaFootballBall />
                </IconContext.Provider>
            </h4>
        </section>
    )
}

export default Intro