// Install styled-components: npm install styled-components

import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2a2a2a;
  color: white;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2a2a2a;
  color: white;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const UserLogo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: gray;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'gray' : 'initial')};
`;

const SubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 20px;
`;

const SubMenuItem = styled.li`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'gray' : 'initial')};
`;

// Component
const AdminPanel = () => {
    const [selectedMenu, setSelectedMenu] = useState('dashboard');
    const [selectedSubMenu, setSelectedSubMenu] = useState(null);

    const handleMenuClick = (menu) => {
        if (selectedSubMenu === menu) {
            // Close submenu if it's already open
            setSelectedSubMenu(null);
        } else {
            setSelectedSubMenu(menu);
            setSelectedMenu(menu);
        }
    };

    return (
        <Container>
            <Sidebar>
                <Header>
                    <Logo>ZeeBlog</Logo>
                    <UserLogo />
                </Header>
                <Menu>
                    <MenuItem selected={selectedMenu === 'dashboard'} onClick={() => handleMenuClick('dashboard')}>
                        Dashboard
                    </MenuItem>
                    <MenuItem selected={selectedMenu === 'users'} onClick={() => handleMenuClick('users')}>
                        Users
                        {selectedMenu === 'users' && (
                            <SubMenu>
                                <SubMenuItem selected={selectedSubMenu === 'userList'} onClick={() => setSelectedSubMenu('userList')}>
                                    User List
                                </SubMenuItem>
                                <SubMenuItem selected={selectedSubMenu === 'blogs'} onClick={() => setSelectedSubMenu('blogs')}>
                                    Blogs
                                </SubMenuItem>
                            </SubMenu>
                        )}
                    </MenuItem>
                    <MenuItem selected={selectedMenu === 'account'} onClick={() => handleMenuClick('account')}>
                        Account
                    </MenuItem>
                    <MenuItem selected={selectedMenu === 'profile'} onClick={() => handleMenuClick('profile')}>
                        Profile
                    </MenuItem>
                    <MenuItem selected={selectedMenu === 'logout'} onClick={() => handleMenuClick('logout')}>
                        Logout
                    </MenuItem>
                </Menu>
            </Sidebar>
            <MainContent>
                {/* Render content based on selectedMenu */}
                <h1>{selectedMenu}</h1>
            </MainContent>
        </Container>
    );
};

export default AdminPanel;
