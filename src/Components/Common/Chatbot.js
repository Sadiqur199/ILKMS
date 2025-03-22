import React, { useState, useEffect } from 'react'
import './Chatbot.css'
import { motion } from "framer-motion"

const Chatbot = props => {

    const [hovered, setHovered] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
          setShouldAnimate(true);
        }, 5000); // 5 minutes in milliseconds
    
        return () => clearInterval(interval);
      }, []);

    return (
        <>
           
            <div className='chatbot_div_main'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
            >


                {hovered ?

                    <motion.div>
                        <img src='/images/chatbot_icon2.png' className='transition_div' />
            
                    </motion.div>
                    :
                    <motion.div 
                        animate={shouldAnimate ? { rotate: [0, 360, 0, 0, 0, 0],
                        
                            x: [0, -100, -100, 0, 0, 0] }: {}}  
                        transition={{duration: 5}}
                        onAnimationComplete={() => setShouldAnimate(false)}
                    >
                        <img src='/images/chatbot_icon2.png' className='transition_two_div'/>
                            
                    </motion.div>
                }
            </div>
        </>
    )
}

export default Chatbot
