
import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@mui/material';
import { FlexCenter, FlexContainer } from '../../styled-components';
import EditIcon from '@mui/icons-material/Edit'
import { removeNumUser } from '../../utils/axios/axios-interceptor';
const Container = styled.section`
  width: 100%;
`;

const Main = styled.article`
  width: 100%;
  height: 400px;
  position: relative;
  box-shadow: 0px 5px 8px darkgrey;
  transition: all 0.5s ease-in-out;
  

  /* @media (max-width: 700px) {
    margin: auto;
  } */
`;

const UserThumbnail = styled.div`
  width: 100%;
  height: 200px;
  background: #FFAE33;
`;


const commonAbsolute = css`
    position: absolute;
    box-shadow: 0px 3px 5px darkgrey;
    border: solid 2px white;
    transition: all 1s ease-in-out;
    border-radius: 50%;
    background-size: cover;
    cursor: pointer;
`



const Pic = styled.img`
 ${commonAbsolute}
    width: 150px;
    height: 150px;
    top: 30%;
    left: 10%;
    background: #f0f0f0;


`;

const EditIconButton = styled.div`
 ${FlexCenter}
  ${commonAbsolute}
    width: 40px;
    height: 40px;
    top: 55%;
    right: 4%;
    z-index: 99;
    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFAE33;
    opacity: 0;
    border-radius: 100%;
    transition: opacity 0.5s;
    pointer-events: none;
  }

  &:active::before {
    opacity: 1;
  }
`

const UserDetail = styled.div`
    color: #000;
    padding: 80px 20px 20px 100px;
    ${FlexContainer}
    `;

const UserDetailLeft = styled.div`
max-width: 600px;
    
`
const UserDetailRight = styled.div`
  padding: 0px 10px ;
  button{
    margin-right: 7px;
  }
`

const Name = styled.h1`
    color: #000;
    font-size: 24px;
    text-transform: capitalize;
`;
const Designation = styled.h3`
    color: #383838;
    font-size: 18px;
    margin-bottom: 12px;
`;


const Description = styled.p`
  color: #676767;
  font-weight: 100;
  font-size: 1rem;
  line-height: 1.5;
`;

const UserProfileCard = ({ currentUser }) => {

  console.log(currentUser?.blogs?.length, "currentUser?.blogs?.length")
  return (
    <Container>
      <Main>
        <UserThumbnail></UserThumbnail>
        <Pic id="profile_pic" src={currentUser?.profile} />
        <EditIconButton><EditIcon /></EditIconButton>
        <UserDetail>
          <UserDetailLeft>
            <Name>{removeNumUser(currentUser?.username)}</Name>
            <Designation>FullStack Developer</Designation>
            <Description>I am Fullstack Developer abcd word world about chandrana oon earth sun space</Description>
          </UserDetailLeft>
          <UserDetailRight>
            <Button variant='outlined' >{currentUser?.blogs?.length} Blogs</Button>
            <Button variant='outlined' >{currentUser?.followers?.length}  Followers</Button>
            <Button variant='outlined' >{currentUser?.following?.length}  Following</Button>
          </UserDetailRight>
        </UserDetail>
      </Main>
    </Container>
  );
};

export default UserProfileCard;
