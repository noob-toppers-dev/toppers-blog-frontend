import React, { useEffect, useState } from 'react'
import { CommentBoxContainer, CommentBoxInner, CommentInputBox, FormTextArea } from '../../styled-components'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useAddComment, useDeleteComment, useGetSingleComment } from '../../query-hooks/blogs/hooks'
import { getUserName } from '../../utils/axios/axios-interceptor'
import { toast } from 'react-hot-toast'
import Loader from '../../components/loader'
import CommentItem from '../../components/comment-card/comment-item'







const initialValue = {
    username: "",
    postId: "",
    comments: "",
    commentDate: new Date()
}

const Comments = ({ blog, setShowCommentBox }) => {
    const [comment, setComment] = useState(initialValue);
    const [commentList, setCommentList] = useState([]);
    const currentUser = getUserName();

    const { data: commentData, isLoading, refetch: refetchComments } = useGetSingleComment({ id: blog?._id });

    // add comment
    const { mutateAsync: commentAPI, isLoading: commentLoading } = useAddComment();

    //delete comment
    const deleteCommentById = useDeleteComment();

    const deleteComment = async (commentId) => {
        try {
            await deleteCommentById.mutateAsync({ id: commentId });
            toast.success('Comment deleted successfully');
            refetchComments()
        } catch (error) {
            toast.error('An error occured while deleting comment:', error.message);
        }
    };

    // get comment by blog

    // const commentData = useGetSingleComment({ id: blog?._id }).data || [];


    const handleComment = (e) => {
        setComment({
            ...comment,
            postId: blog?._id,
            username: currentUser,
            comments: e.target.value,
        })
    }

    const addComment = async () => {
        if (comment?.comments !== "" && comment.comments.trim('') !== "") {
            await commentAPI(comment);
            setComment(initialValue)
            setShowCommentBox(true)
            refetchComments();
            toast.success("Added comment")
            // refetchComments()
        } else {
            toast.error('Please fill the comments..')
        }
    }





    return (
        <CommentBoxContainer>
            <CommentBoxInner>
                <CommentInputBox >
                    <FormTextArea
                        style={{ padding: '0px 8px', height: '34px', border: 'transparent', borderBottom: '1px solid #555555', borderRadius: '0px' }}
                        type={'textarea'}
                        placeholder={'Comment....'}
                        name='comments'
                        value={comment?.comments}
                        onChange={handleComment}

                    />
                    <Button variant="contained" type='submit' onClick={addComment} ><SendIcon /></Button>
                </CommentInputBox>
                {isLoading || commentLoading ? <Loader />
                    : commentData && commentData?.map((ele) => (
                        <CommentItem key={ele?._id} comment={ele} currentUser={currentUser} deleteComment={deleteComment} />
                    ))

                }
            </CommentBoxInner>
        </CommentBoxContainer>
    )
}

export default Comments