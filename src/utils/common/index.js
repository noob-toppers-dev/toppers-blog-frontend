// Storing tokens
export const setTokens = (accessToken, refreshToken) => {
    sessionStorage.setItem('access-token', JSON.stringify(accessToken));
    sessionStorage.setItem('refresh-token', JSON.stringify(refreshToken));
};

export const setUserDetail = (user) => {
    sessionStorage.setItem('auth-user', JSON.stringify(user))
};


export const getAccessToken = () => {
    const token = JSON.parse(sessionStorage.getItem('access-token'));
    return token;
};


export const getRefreshToken = () => {
    return localStorage.getItem('refresh-token');
};

export const getUserName = () => {
    const user = JSON.parse(sessionStorage.getItem('auth-user'));
    return user?.username;
};


export const clearTokens = () => {
    sessionStorage.removeItem('access-token')
    sessionStorage.removeItem('refresh-token')
    sessionStorage.removeItem('auth-user')
}


export const currentUserApp = () => {
    const user = JSON.parse(sessionStorage.getItem('auth-user'));
    return user
}

export const removeNumUser = (user) => {
    let username = ''
    for (let i = 0; i < user.length; i++) {
        if (isNaN(user[i])) {
            username += user[i]
        }
    }
    return username
}

export const findUserName = (name) => {
    return name?.substring(0, 2);
}

export const findPostDate = (date) => {
    return date?.substring(0, 10);
}

export const elipsisText = (str, maxLen) => {
    return str.length > maxLen ? str.substring(0, maxLen) + "..." : str;
}

export const highlightText = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    if (!text) {
        return null;
    }
    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={index} style={{ color: '#ffae33' }}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
};