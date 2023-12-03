import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { currentUserApp, elipsisText } from '../../utils/axios/axios-interceptor';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../context';
import DialogBox from '../diaog-box/dialog-box';
import Loader from '../loader';
import { useDisLikeBlog, useLikeBlog, useUserFollower, useUserUnFollower } from '../../query-hooks/blogs/hooks';
import { toast } from 'react-hot-toast';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { findPostDate } from '../../utils/common';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
width: 100%;
margin-bottom: 15px;
min-height: 200px;
`
const CardBox = styled.div`
  display: flex;
    border: 1px solid #fff;
    height: 100%;
    background: #fff;
    color: #000;
    @media (max-width: 576px) {
   flex-direction: column-reverse;
  }
`;

const LeftContent = styled.div`
  width: 70%;
  padding: 20px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-transform: capitalize;
  @media (max-width: 576px) {
    width: 100%;
  padding: 4px; 
  }
`;

const RightContent = styled.div`
  width: 30%;
  background-color: #f2f2f2; 
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 18px; 
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px; 
  margin: 0;
`;

const Badge = styled.span`
  background-color: #0073e6; 
  color: #fff; 
  padding: 5px; 
  border-radius: 4px;
  margin-top: 10px; 
  display: inline-block;
  max-width: 100px;
  text-align: center;
  width: 100%;
`;

const Image = styled.img`
min-height: 150px;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
    height: 45px;
    background-color: #fdfdfd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    color: #000;
    border-bottom: 1px solid #f0f0f0;
`;
const LeftHeader = styled.div`
  display: flex;
    align-items: center;
`

const ProfileLogo = styled.img`
  width: 40px; 
  height: 40px; 
  border-radius: 50%;
  margin-right: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adjust the spacing */
`;

const UserName = styled.div`
  font-weight: bold;
  font-size:12px;
  margin-right: 10px; /* Adjust the spacing */
`;

const Date = styled.div`
font-size:12px;

  margin-right: 10px; /* Adjust the spacing */
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  width: 20px; /* Customize the size */
  height: 20px; /* Customize the size */
  margin-left: 10px; /* Adjust the spacing */
`;

const FavoriteIconStyle = styled(FavoriteIcon)`
    color: ${props => (props.islike === 'true' ? 'crimson' : '')}; 
    font-size: 25px;
`


const Card = ({ data, blogLoading, highlightText, query }) => {
  const { title, description, createdAt, picture, _id: blogId, username, category } = data;
  const [isLiked, setIsLiked] = useState(false);
  const auth = sessionStorage.getItem('access-token');

  const { cardActionModal, handleCardAction, handleCardCloseAction } = useContext(AuthContext);
  const currentUser = currentUserApp ? currentUserApp() : {};

  const likeBlog = useLikeBlog();
  const disLikeBlog = useDisLikeBlog();

  const handleLikeBlog = async (blogId) => {
    try {
      if (currentUser?.userId) {

        await likeBlog.mutateAsync({ blogId, userId: currentUser?.userId });
        toast.success('Liked!!');
        setIsLiked(true);
      }
    } catch (error) {
      console.error(error.message);
    }

  }

  const handleDisLikeBlog = async (blogId) => {
    try {
      if (currentUser?.userId) {

        await disLikeBlog.mutateAsync({ blogId, userId: currentUser?.userId });
        toast.success("Disliked!!")
        setIsLiked(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  }


  useEffect(() => {
    if (data && data.likes) {
      const userLiked = data.likes.includes(currentUser?.userId);
      setIsLiked(userLiked);
    }
  }, [data, currentUser?.userId]);

  if (blogLoading) {
    return <Loader />
  }
  return (
    <CardContainer>
      <HeaderContainer>
        <LeftHeader>
          <ProfileLogo src={currentUser?.profile || picture} alt="Profile" />
          <UserInfo>
            <UserName>Zahid Khan</UserName>
            <Date>{findPostDate(createdAt)}</Date>
          </UserInfo>
        </LeftHeader>
        {
          auth &&
          <IconContainer>
            <IconButton aria-label="like" onClick={() => isLiked ? handleDisLikeBlog(blogId) : handleLikeBlog(blogId)}>
              <FavoriteIconStyle islike={isLiked.toString()} />
              <span>{data?.likes?.length}</span>
            </IconButton>
            {/* <Icon src="dots-icon.png" alt="Dots" /> */}
            <IconButton aria-label="settings">
              <MoreVertIcon className='cursor-p' onClick={() => handleCardAction(blogId)} />
            </IconButton>
            {cardActionModal === blogId ?
              <DialogBox
                blogUser={username}
                blogId={cardActionModal}
                onClose={handleCardCloseAction}
              />
              : null}
          </IconContainer>
        }
      </HeaderContainer>
      <Link to={`/blog-detail-page/${blogId}`}>
        <CardBox>
          <LeftContent>
            <Title>{highlightText(title, query)}</Title>
            <Subtitle>{highlightText(description, query)}<span> more</span></Subtitle>
            <Badge>{category}</Badge>
          </LeftContent>
          <RightContent>
            <Image src={picture} alt={title} />
          </RightContent>
        </CardBox>
      </Link>
    </CardContainer>

  );
};

export default Card;
