import { useEffect } from 'react';
import { logoutUser } from '../helpers/index'; // Import your logoutUser function
import { useNavigate } from 'react-router-dom';
export function useAutoLogout(tokenExpirationTime) {

    useEffect(() => {
        if (tokenExpirationTime !== null) {
            const tokenExpirationInterval = setInterval(() => {
                const currentTime = Math.floor(Date.now() / 1000);

                if (tokenExpirationTime <= currentTime) {
                    logoutUser();
                    // navigate('/login')
                    clearInterval(tokenExpirationInterval);
                }
            }, 1000); // Check every second

            return () => {
                clearInterval(tokenExpirationInterval);
            };
        }
    }, [tokenExpirationTime]);
}
