import React from 'react'

const Live = () => {
    return (
        <div style={{

            background: '#FFFFFF',
            border: '0.5px solid rgba(0, 165, 80, 0.5)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70px',
            padding: '2px',

            
        }}>
            <img src="/images/live.svg" style={{height: '16px'}}/>
            <p style={{
                color: '#00A550',
                marginBottom: '0px',
                fontSize: '14px',
                marginLeft: '5px',

            }}>সক্রিয়</p>
        </div >
    )
}

export default Live
