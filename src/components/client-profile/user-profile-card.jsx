
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, Grid, TextField } from '@mui/material';
import { FlexCenter, FlexContainer } from '../../styled-components';
import EditIcon from '@mui/icons-material/Edit'
import { removeNumUser } from '../../utils/axios/axios-interceptor';
import { uploadPicture } from '../../helpers';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import ButtonLoader from '../loader/button-loader';
import Loader from '../loader';
import { useGetUserProfile } from '../../query-hooks/auth/hooks';
const Container = styled.section`
  width: 100%;
`;

const Main = styled.article`
${FlexCenter}
flex-wrap: wrap;
  width: 100%;
  min-height: 300px;
  height: 100%;
  padding: 10px;
  background: #21242a;
  box-shadow: 0px 5px 8px darkgrey;
  transition: all 0.5s ease-in-out;
  
`;

const UserThumbnail = styled.div`
  width: 100%;
  height: 200px;
  background: #FFAE33;
`;


const commonAbsolute = css`
    position: absolute;
    box-shadow: 0px 3px 5px darkgrey;
    border: solid 2px #FFAE33;
    transition: all 1s ease-in-out;
    border-radius: 50%;
    background-size: cover;
    cursor: pointer;
`



const ProfileConatiner = styled.div`
position: relative;
 ${FlexCenter}

@media(max-width:576px){
  .profile {
      margin: 0 auto; 
      display: block;
    }
}
`


const Pic = styled.img`
    width: 150px;
    height: 150px;
    background: #f0f0f0;
    box-shadow: 0px 2px 10px 4px #f5b24d;
    border: solid 2px #FFAE33;
    transition: all 1s ease-in-out;
    border-radius: 50%;
    background-size: cover;


`;

const EditIconButton = styled.label`
    ${FlexCenter}
    ${commonAbsolute}
    width: 40px;
    height: 40px;
    top: 70%;
    left: 65%;
    z-index: 99;
    color: #FFAE33;
    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFFEEE;
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
    color: #FFFEEE;
    text-align: left;
    padding-top: 20px;
    padding-left: 40px;
    max-width: 500px;
    width: 100%;
    @media(max-width:576px){
      text-align: center;
      padding-left: 5px;
}
    `;

const UserDetailLeft = styled.div`
/* max-width: 600px; */
    
`
const UserDetailRight = styled.div`
  padding: 0px 10px ;
  button{
    margin-right: 7px;
    margin-bottom: 7px;
  }
`

const Name = styled.h1`
    font-size: 24px;
    margin-bottom: 15px;
    text-transform: capitalize;
`;
const Designation = styled.h3`
    font-size: 20px;
    margin-bottom: 15px;
`;


const Description = styled.p`
  font-weight: 100;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const UserProfileCard = ({ currentUser }) => {

  const [file, setFile] = useState("");
  const [profileImage, setProfileImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(false);

  const { data: CurrentProfile, isLoading: profileLoading } = useGetUserProfile(currentUser && currentUser?._id);


  console.log(CurrentProfile, "curprofiek")
  const imagePreviewUrl = CurrentProfile?.user?.profile ? CurrentProfile?.user?.profile : 'https://images.unsplash.com/photo-1575439462433-8e1969065df7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8OTQ1MjQ5NHx8ZW58MHx8fHx8'

  const { mutate: uploadPicMutation, isLoading: imageLoading } = useMutation(uploadPicture, {
    onSuccess: (data) => {
      console.log(data, "profile")
    },
    onError: (error) => {
      console.log(error, "upload  error")
    }
  });

  console.log(profileImage, "profileImage")

  useEffect(() => {
    (async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        uploadPicMutation(data, {
          onSuccess: (datas) => {
            console.log(datas, "datass")
            setProfileImage(datas)
          },
          onError: (error) => {
            toast.error(error)
            console.error('Profile upload failed', error);
          }
        })
      }
    })()
  }, [file]);


  if (profileLoading) {
    return <Loader />
  }

  return (
    <Container>
      <Main>
        <ProfileConatiner>
          {previewUrl ? <ButtonLoader /> : <Pic className='profile' id="profile_pic" src={imagePreviewUrl} />}
          <EditIconButton htmlFor='picture'><EditIcon /></EditIconButton>
          <TextField
            id='picture'
            type={'file'}
            name='file'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}

          />
        </ProfileConatiner>
        <UserDetail>
          <UserDetailLeft>
            <Name>{removeNumUser(CurrentProfile?.user?.username)}</Name>
            <Designation>FullStack Developer</Designation>
            <Description>I am Fullstack Developer abcd word world about chandrana oon earth sun space</Description>
          </UserDetailLeft>
          <UserDetailRight>
            <Button variant='outlined' >{CurrentProfile?.user?.blogs?.length} Blogs</Button>
            <Button variant='outlined' >{CurrentProfile?.user?.followers?.length}  Followers</Button>
            <Button variant='outlined' >{CurrentProfile?.user?.following?.length}  Following</Button>
          </UserDetailRight>
        </UserDetail>
      </Main>
    </Container>
  );
};

export default UserProfileCard;
