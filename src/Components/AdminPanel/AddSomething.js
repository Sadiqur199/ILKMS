import React from 'react'
import { BsPlusCircle } from 'react-icons/bs'

const AddSomething = ({ addText }) => {
    return (
        <div style={{
            padding: '10px 20px',
            background: 'var(--primary-color)',
            borderRadius: '10px',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <BsPlusCircle style={{ marginRight: '8px' }} fontSize={20} />
            {addText}
        </div>
    )
}

export default AddSomething
