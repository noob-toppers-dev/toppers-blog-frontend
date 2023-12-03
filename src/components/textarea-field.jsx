import React from 'react'
import { FormTextArea } from '../styled-components'

const TextAreaField = ({ type, placeholder, value, onChange, name, onKeyUp }) => {
    return (

        <FormTextArea
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
        />
    )
}

export default TextAreaField