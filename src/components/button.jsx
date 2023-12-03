import React from 'react'

const Button = ({ children, padding, width, onClick, size, bColor, color }) => {
    return (
        <button
            onClick={onClick}
            style={
                {
                    padding: padding,
                    width: width,
                    fontSize: size,
                    background: bColor,
                    color: color,
                }
            }
        >
            {children}
        </button>
    )
}

export default Button