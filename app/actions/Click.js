
import React from 'react'



const navClick = async (e) => {

    const buttons = document.querySelectorAll('.click');
    buttons.forEach(button => {
        button.style.backgroundColor = ''; // Reset background color
    });
    const link = e.target;
    link.style.backgroundColor = "#ea002a";

  
   
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = e.target.getAttribute('href').substring(1); // Get the target section ID
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section
    
      




}

export default navClick