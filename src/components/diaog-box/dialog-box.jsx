import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { Dialog, List, ListItem } from '../../styled-components'
import { currentUserApp } from '../../utils/axios/axios-interceptor'
import { useMutation, useQueryClient } from 'react-query'
import { deleteBlogMutation } from '../../query-hooks/blogs/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSavedBlog } from '../../query-hooks/blogs/hooks'
const DialogBox = ({ blogId, onClose, blogUser }) => {
    const currentUser = currentUserApp ? currentUserApp() : {};
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const saveBlog = useSavedBlog();



    // todo? delete blog mutation
    const deleteBlogData = useMutation(deleteBlogMutation, {
        onSuccess: () => {
            toast.success('Blog deleted successfully');
            queryClient.invalidateQueries('get-all-blog');
        },
        onError: (error) => {
            console.error('An error occured while deleting blog:', error.message);
        }
    });

    //todo? delete blog function
    const deleteBlog = (id) => {
        deleteBlogData.mutate({ id });
    }

    const handleSavedBlog = async (blogId) => {
        try {
            if (currentUser?.userId) {
                await saveBlog.mutateAsync({ blogId, userId: currentUser?.userId });
                toast.success('Saved!!');
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Dialog>
            <OutsideClickHandler onOutsideClick={onClose}>
                <List>
                    {currentUser?.username === blogUser ?
                        <>
                            <ListItem onClick={() => navigate(`/update-blog/${blogId}`)}><EditIcon />Edit</ListItem>
                            <ListItem onClick={() => deleteBlog(blogId)} ><DeleteIcon />Delete</ListItem>
                        </>
                        :
                        <>
                            <ListItem>Follow</ListItem>
                            <ListItem onClick={() => navigate('/user-profile')}>View Profile</ListItem>
                        </>
                    }
                    <ListItem onClick={() => handleSavedBlog(blogId)}><BookmarkBorderIcon />Save</ListItem>
                </List>
            </OutsideClickHandler>
        </Dialog>
    )
}

export default DialogBox