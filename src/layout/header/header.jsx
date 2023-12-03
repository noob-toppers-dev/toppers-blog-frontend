import React from 'react'
import { HeaderLogoStyle, HeaderWrapper, NavListStyle, NavigationStyle, ProfileLogo, ProfileStyle, RightContent } from '../../styled-components'

import { NavLink, useNavigate } from 'react-router-dom'
import ClientProfile from '../../components/client-profile/client-profile'
import { useMutation } from 'react-query'

import { toast } from 'react-hot-toast'
import { Avatar } from '@mui/material'
import OutsideClickHandler from 'react-outside-click-handler'
import { currentUserApp } from '../../utils/axios/axios-interceptor'
import { logoutUser } from '../../query-hooks/auth/api'
import ZeeLogo from '../../assets/zee-logo.png'

const Header = ({ theme }) => {
    const [toggleProfile, setToggleProfile] = React.useState(false);

    const navigate = useNavigate();
    const { mutate: logoutAPI, isLoading } = useMutation(logoutUser)

    const isAuth = JSON.parse(sessionStorage.getItem('access-token'));
    const currentUser = currentUserApp();

    // const { auth, blogData, blogLoading } = useContext(AuthContext);



    const findUserName = (name) => {
        return name?.substring(0, 2);
    }



    const handleLogout = () => {
        logoutAPI();
        toast.success('Logout!')
        navigate('/login')
    }





    return (
        <HeaderWrapper theme={theme.toString()}>
            <HeaderLogoStyle theme={theme.toString()}>
                <NavLink to="/welcome-page"><img src={ZeeLogo} /><span>Blog</span></NavLink>
            </HeaderLogoStyle>
            <RightContent>
                {isAuth ?
                    <>
                        <NavigationStyle >
                            <NavListStyle theme={theme.toString()}><NavLink to="/welcome-page">Home</NavLink></NavListStyle>
                            {/* <NavListStyle theme={theme.toString()}><NavLink to="/saved-blogs">Saved Blogs</NavLink></NavListStyle> */}
                        </NavigationStyle>
                        <OutsideClickHandler onOutsideClick={() => setToggleProfile(false)}>
                            <ProfileLogo onClick={() => setToggleProfile(!toggleProfile)}><Avatar alt={currentUser?.username} src={currentUser?.profile} /></ProfileLogo>
                            {toggleProfile &&
                                <ProfileStyle>
                                    <ClientProfile findUserName={findUserName} user={currentUser} logout={handleLogout} profile={"/user-profile"} />
                                </ProfileStyle>
                            }
                        </OutsideClickHandler>
                    </>
                    :
                    <NavigationStyle>
                        <NavListStyle theme={theme.toString()}><NavLink to="/register">Register</NavLink></NavListStyle>
                        <NavListStyle theme={theme.toString()}><NavLink to="/login">Login</NavLink></NavListStyle>
                    </NavigationStyle>
                }
            </RightContent>
        </HeaderWrapper>

    )
}

export default Header