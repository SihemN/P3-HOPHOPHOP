import React from 'react';


const TeamMembers = ({ image, name, color }) => {
    return (
        <>
        <div className='font-Neue-Kabel'>
            <div className={`${color} rounded-full h-36 w-36 flex justify-center items-center shadow-md`}>
                <img src={image} alt="Membre de l'équipe" className='rounded-full w-24 h-24 ' />
            </div>
            <p className='text-center'>{name}</p>
        </div>
        </>
    );
}

export default TeamMembers;
