import React from 'react';

export default function Profile(){

    return (
        <div className='profile-component'>
        
        <form>
        <div className='profile-pic-input'>
            <input/>
        </div>

        <div className ='name'></div>

        <div className='linkedin-input'>
            <input/>
        </div>
        <div className='portfolio-input'>
            <input/>
        </div>
        <div className='github-input'>
            <input/>
        </div>
        <div className='quote-input'>
            <input/>
        </div>

        <div className='profile-save-button'>
            <button className='profile-save-button' type='submit'>Save</button>
        </div>

        </form>



        </div>
    )
}