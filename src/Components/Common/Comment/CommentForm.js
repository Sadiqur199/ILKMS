import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const CommentForm = ({ handleSubmit, submitLabel }) => {
    const [text, setText] = useState("");
    const isTextAreaDisabled = text.length === 0;
    const onSubmit = event => {
        event.preventDefault()
        handleSubmit(text)
        setText("")
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea className='comment-form-textarea'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button type='submit' disabled={isTextAreaDisabled}>{submitLabel}</Button>
        </form>
    )
}

export default CommentForm
