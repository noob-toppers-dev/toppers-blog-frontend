import React, { useContext } from 'react'
import { ProfileList } from '../../styled-components'
import { Avatar, styled } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context'


const CommonAvatar = css`
    width: 30px;
    height: 30px;
    margin-right: 6px;
    font-size: 15px;
     text-transform: uppercase;
     background: #ffae33;

`

const PrfileAvatar = styled(Avatar)`
 ${CommonAvatar}
`
const ExitAvatar = styled(ExitToAppIcon)`
    ${CommonAvatar}
    background: transparent;
    color: crimson;
`

const ClientProfile = ({ user, logout, profile, findUserName }) => {
    // <PrfileAvatar >{findUserName(user?.name)}</PrfileAvatar>
    const { handleThemeMode, themeMode } = useContext(AuthContext)
    return (
        <React.Fragment>
            <ProfileList>
                {user?.profile ?
                    <Avatar alt={user?.username} src={user?.profile} />
                    :
                    <PrfileAvatar >{findUserName(user?.name)}</PrfileAvatar>
                }
                <span>{user?.username}</span>
            </ProfileList>
            <ProfileList><PrfileAvatar /><Link to={profile}>Profile</Link></ProfileList>
            <ProfileList><PrfileAvatar /><Link to="/saved-blogs">Saved Blogs</Link></ProfileList>
            <ProfileList onClick={handleThemeMode} ><PrfileAvatar />{`${themeMode ? 'Dark' : 'Light'}`} Mode</ProfileList>
            <ProfileList onClick={logout} ><ExitAvatar />Logout</ProfileList>
        </React.Fragment>
    )
}

export default ClientProfile