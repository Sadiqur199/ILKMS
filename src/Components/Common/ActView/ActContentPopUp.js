import React from 'react'
import useAuth from '../../../hooks/authHooks'

const ActContentPopUp = ({ content }) => {
    const { isPopUpOpen, setIsPopUpOpen } = useAuth()

    const closePopUp = () => {
        setIsPopUpOpen(false)
    }

    return (
        <div
            className='Support_window_transition'
            style={{
                // height: '200px',
                width: '700px',
                maxWidth: '70%',
                background: 'white',
                bottom: '50vh',
                // right: isOpen ? '100px' : '-500px',
                left: isPopUpOpen ? 'calc(50% - 350px)' : '-500px',
                position: 'fixed',
                overflow: 'hidden',
                boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
                zIndex: '10000',
                borderColor: '#0C6395',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '10px',
                opacity: isPopUpOpen ? '1' : '0',
                padding: '20px',

            }}
        >
            <span className="close" onClick={closePopUp} style={{
                position: 'absolute',
                top: '-5px',
                right: '10px',
                cursor: 'pointer',
                fontSize: '24px',
            }}>
                &times;
            </span>
            <span style={{
                color: 'black',
            }}>{content}</span>
        </div>
    )
}

export default ActContentPopUp
