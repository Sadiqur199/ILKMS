import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../../hooks/authHooks'
import Chatbot from '../Common/Chatbot'
import SupportWindow from './SupportWindow'

const ChatbotView = () => {
    const {visible, setVisible} = useAuth()
    const ref = useRef(null)

    useEffect(()=> {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target))
            {
                setVisible(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref])
    return (
        <div ref={ref}>
            <SupportWindow 
            visible={visible} 
            //     style={{
                    
            //     }}
            />
            <Chatbot onClick={()=> setVisible(!visible)} />
        </div>
    )
}

export default ChatbotView
