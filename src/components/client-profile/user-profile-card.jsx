
import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Grid } from '@mui/material';
import { FlexCenter, FlexContainer } from '../../styled-components';
import EditIcon from '@mui/icons-material/Edit'
import { removeNumUser } from '../../utils/axios/axios-interceptor';
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
      margin: 0 auto; // Center the image horizontally
      display: block; // Remove any default inline styling
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

const EditIconButton = styled.div`
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

  console.log(currentUser?.blogs?.length, "currentUser?.blogs?.length")
  // const { mutate: uploadPicMutation, isLoading: imageLoading } = useMutation(uploadPicture, {
  //     onSuccess: (data) => {
  //     },
  //     onError: (error) => {
  //         console.log(error, "upload  error")
  //     }
  // });
  //   <PictureLabelStyle htmlFor='picture'  >
  //   {imageLoading ? <Loader /> : previewUrl && <PriviewImage src={imagePreviewUrl} alt="Preview" />}
  //   <FileUploadIcon /> <span>Profile Upload</span>
  // </PictureLabelStyle>
  // <TextField
  //   id='picture'
  //   type={'file'}
  //   name='file'
  //   style={{ display: 'none' }}
  //   onChange={(e) => setFile(e.target.files[0])}

  // />

  // useEffect(() => {
  //     (async () => {
  //         if (file) {
  //             const data = new FormData();
  //             data.append("name", file.name);
  //             data.append("file", file);
  //             await uploadPicMutation(data, {
  //                 onSuccess: (datas) => {
  //                     setInputValue((prevValue) => ({
  //                         ...prevValue,
  //                         profile: datas,
  //                     }));
  //                     setPreviewUrl(true)
  //                 },
  //                 onError: (error) => {
  //                     toast.error(error)
  //                     console.error('Profile upload failed', error);
  //                 }
  //             })
  //         }
  //     })()
  // }, [file]);

  // const [file, setFile] = useState("");

  // const imagePreviewUrl = inputValue?.picture ? inputValue?.picture : 'https://logodix.com/logo/2003981.png'

  return (
    <Container>
      <Main>
        {/* <Grid container spacing={2}>
          <Grid item md={4} sm={6}> */}
        <ProfileConatiner>
          <Pic className='profile' id="profile_pic" src={currentUser?.profile} />
          <EditIconButton><EditIcon /></EditIconButton>
        </ProfileConatiner>
        {/* </Grid>
          <Grid item md={8} sm={6}> */}

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
        {/* </Grid>
        </Grid> */}
      </Main>
    </Container>
  );
};

export default UserProfileCard;
