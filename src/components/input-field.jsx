import React from 'react'
import { FormInput } from '../styled-components'

const InputField = ({ type, placeholder, value, onChange, name, onKeyUp }) => {
    return (
        <FormInput
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}

        />
    )
}

export default InputField