import React from 'react';

import ghost from "../assets/logo/ghost-green.svg"

const Footer = () => {
    return (
        <footer className='bg-blue-default pt-8 pb-5 text-cream text-center font-Neue-Kabel'>
            <p className='px-8'>Ce projet a été réalisé avec amour dans le cadre de la formation Développeur Fullstack à la Wild Code School.</p>
            <p className='pt-4'>Avec la participation de:</p>
            <ul>
                <li>Javascript / ReactJS</li>
                <li>NodeJS / ExpressJS</li>
                <li>Git / GitHub</li>
            </ul>
            <img className='hidden md:inline-block h-24 w-28pt-4 pt-4' src={ghost} alt="Hoppy" />
            <div className='flex justify-between pt-5 px-4'>
                <p>Wild Code School (2024)</p>
                <p>&copy; Hop Hop Hop</p>
            </div>
        </footer>
    );
}

export default Footer;
