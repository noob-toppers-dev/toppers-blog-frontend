import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import { currentUserApp, elipsisText, findPostDate, findUserName } from '../../utils/axios/axios-interceptor';
import { Link } from 'react-router-dom';
import { useDisLikeBlog, useLikeBlog, useUserFollower, useUserUnFollower } from '../../query-hooks/blogs/hooks';
import { toast } from 'react-hot-toast';
import Loader from '../loader';
import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../context';

import DialogBox from '../diaog-box/dialog-box';
const FavoriteBorderIconStyle = styled(FavoriteBorderIcon)`
        color: ${props => (props.islike === 'true' ? 'crimson' : '')}; 
        font-size: 25px;

`
const FavoriteIconStyle = styled(FavoriteIcon)`
    color: ${props => (props.islike === 'true' ? 'crimson' : '')}; 
    font-size: 25px;
`

const CardStyle = styled(Card)`
    max-height: 430px;
    height: 100%;
    position: relative;
`

const BlogCard = ({ data, blogLoading }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const { cardActionModal, handleCardAction, handleCardCloseAction } = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(true);
    const { userId, profile, username, followers, following } = currentUserApp();


    const likeBlog = useLikeBlog();
    const disLikeBlog = useDisLikeBlog();

    const followUserAPI = useUserFollower()
    const unfollowUserAPI = useUserUnFollower()


    const handleLikeBlog = async (blogId) => {
        try {
            await likeBlog.mutateAsync({ blogId, userId });
            toast.success('Liked!!');
            setIsLiked(true);
        } catch (error) {
            console.error(error.message);
        }

    }

    const handleDisLikeBlog = async (blogId) => {
        try {
            await disLikeBlog.mutateAsync({ blogId, userId });
            toast.success("Disliked!!")
            setIsLiked(false);
        } catch (error) {
            console.error(error.message);
        }
    }


    //follow user
    // const followUser = async (username) => {
    //     await followUserAPI.mutateAsync({ username })
    //     setIsFollowing(true)
    //     toast.success('Followed!!');
    // }
    // const unFollowUser = async (username) => {
    //     await unfollowUserAPI.mutateAsync({ username })
    //     setIsFollowing(false)
    //     toast.success('Unfollow!!');
    // }

    useEffect(() => {
        if (data && data.likes) {
            const userLiked = data.likes.includes(userId);
            setIsLiked(userLiked);
        }
    }, [data, userId]);


    if (blogLoading) {
        return <Loader />
    }
    return (
        <>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <CardStyle>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {findUserName(data?.username)}
                            </Avatar>
                        }
                        title={elipsisText(data?.title, 25)}
                        subheader={findPostDate(data?.createdAt)}
                        action={
                            <>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon className='cursor-p' onClick={() => handleCardAction(data?._id)} />
                                </IconButton>
                                {cardActionModal === data?._id ?
                                    <DialogBox
                                        blogUser={data?.username}
                                        blogId={cardActionModal}
                                        onClose={handleCardCloseAction}
                                    />
                                    : null}
                            </>
                        }
                    />
                    <Link to={`/blog-detail-page/${data?._id}`}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={data?.picture || "no image"}
                            alt="image"
                        />
                    </Link>

                    <CardContent sx={{ p: "8px" }}>
                        <Typography variant="body2" color="text.secondary">
                            {elipsisText(data?.description, 100)}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing >
                        <IconButton aria-label="like" onClick={() => isLiked ? handleDisLikeBlog(data?._id) : handleLikeBlog(data?._id)}>
                            <span>{data?.likes?.length}</span>
                            <FavoriteIconStyle islike={isLiked.toString()} />
                        </IconButton>
                    </CardActions>
                </CardStyle>
            </Grid>

        </>
    )
}

export default BlogCard




