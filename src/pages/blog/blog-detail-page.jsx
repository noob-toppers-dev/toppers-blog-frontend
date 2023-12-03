import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDisLikeBlog, useGetSingleBlog, useLikeBlog, useUserFollower, useUserUnFollower } from '../../query-hooks/blogs/hooks';
import Loader from '../../components/loader';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, styled } from '@mui/material';
import { ActionSection, FormContainerStyle } from '../../styled-components';
import { currentUserApp, findPostDate, findUserName } from '../../utils/axios/axios-interceptor';
import { AuthContext } from '../../context';
import { useMutation } from 'react-query';
import { deleteBlogMutation } from '../../query-hooks/blogs/api';
import { toast } from 'react-hot-toast';
import Comments from '../comments';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ButtonLoader from '../../components/loader/button-loader';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CommentIcon = styled(AddCommentIcon)`
        color: #ffae33;
        margin: 5px;
        cursor: pointer;
`
const FavoriteIconStyle = styled(FavoriteIcon)`
    color: ${props => (props.islike === 'true' ? 'crimson' : '')}; 
    font-size: 25px;
`
const CardStyle = styled(Card)`
  max-width: 700px;
  min-height: 400px;
   margin: 20px 0px;
   /* @media screen{
   } */
`


const BlogDetailPage = () => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(true);

    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const currentUser = currentUserApp();

    const navigate = useNavigate()

    const { data: singleBlog, isLoading, isError, error } = useGetSingleBlog(id);

    const likeBlog = useLikeBlog();
    const disLikeBlog = useDisLikeBlog();




    // todo? delete blog mutation
    const deleteBlogData = useMutation(deleteBlogMutation, {
        onSuccess: () => {
            toast.success('Blog deleted successfully');
            navigate('/')
        },
        onError: (error) => {
            console.error('An error occured while deleting blog:', error.message);
        }
    });


    //todo? delete blog function
    const deleteBlog = (id) => {
        deleteBlogData.mutate({ id });
    }

    //like function

    const handleLikeBlog = async (blogId) => {
        try {
            await likeBlog.mutateAsync({ blogId, userId: currentUser?.userId });
            toast.success('Liked!!');
            setIsLiked(true);
        } catch (error) {
            console.error(error.message);
        }

    }

    //dislike
    const handleDisLikeBlog = async (blogId) => {
        try {
            await disLikeBlog.mutateAsync({ blogId, userId: currentUser?.userId });
            toast.success("Disliked!!")
            setIsLiked(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    const likeCountMemo = useMemo(() => singleBlog?.likes, [singleBlog])

    useEffect(() => {
        if (singleBlog && singleBlog?.likes) {
            const userLiked = singleBlog?.likes.includes(currentUser?.userId)
            setIsLiked(userLiked)
        }
    }, [singleBlog, currentUser?.userId])


    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <h1>{error?.message}</h1>
    }

    return (
        <FormContainerStyle>
            <CardStyle>
                <CardHeader
                    avatar={
                        currentUser?.username === singleBlog?.username ? <Avatar src={currentUser?.profile} alt={currentUser?.username} />
                            :
                            <Avatar sx={{ bgcolor: '#ffae33' }} aria-label="recipe">
                                {findUserName(singleBlog?.username)}
                            </Avatar>
                    }

                    subheader={findPostDate(singleBlog?.createdAt)}
                />
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="340"
                    image={singleBlog?.picture}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {singleBlog?.title}
                    </Typography>
                    <Typography style={{ maxWidth: '700px' }} variant="body2" color="text.secondary">
                        {singleBlog?.description}
                    </Typography>
                    <IconButton aria-label="like" onClick={() => isLiked ? handleDisLikeBlog(singleBlog?._id) : handleLikeBlog(singleBlog?._id)}>
                        <span>{singleBlog?.likes?.length}</span>
                        <FavoriteIconStyle islike={isLiked.toString()} />

                    </IconButton>
                </CardContent>
                <ActionSection>
                    {currentUser?.username === singleBlog?.username && (
                        <CardActions>
                            <Button variant='outlined' color="error" size="small" onClick={() => deleteBlog(singleBlog?._id)}>Delete</Button>
                            <Button variant='contained' size="small" onClick={() => navigate(`/update-blog/${singleBlog?._id}`)} >Edit</Button>
                        </CardActions>
                    )}

                    <h3>Comments</h3> <CommentIcon onClick={() => setShowCommentBox(!showCommentBox)} />
                </ActionSection>
                {showCommentBox &&
                    <Comments blog={singleBlog} setShowCommentBox={setShowCommentBox} />
                }
            </CardStyle >
        </FormContainerStyle>
    )
}

export default BlogDetailPage;

