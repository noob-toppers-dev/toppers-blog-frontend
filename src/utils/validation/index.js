
// export const isValidUserName = (username) => {
//     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(username);

// }
// export const isValidPassword = (password) => {
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
// };

export const isValidEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};



export const isValidUserName = (username) => {
    if (username.length < 4) {
        return "Username must be at least 4 characters long"
    }
    if (!/[A-Z]/.test(username)) {
        return "Username must contain at least one capital letter.";
    }

    if (!/\d/.test(username)) {
        return "Username must contain at least one numeric digit.";
    }
    return true
};



export const isValidPassword = (password) => {
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }

    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }

    if (!/[\W_]/.test(password)) {
        return "Password must contain at least one special character.";
    }

    return true; // Password is valid
};

