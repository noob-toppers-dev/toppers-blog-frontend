import { Avatar, css } from "@mui/material";
import { CommentMessage, CommentMessageBox, CommentText, MessageBox } from "../../styled-components";
import DeleteIcon from '@mui/icons-material/Delete'
import styled from "@emotion/styled";
import { findUserName } from "../../utils/axios/axios-interceptor";

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
const DeletedIcon = styled(DeleteIcon)`
 color: crimson;
 cursor: pointer;

`

const CommentItem = ({ comment, currentUser, deleteComment }) => {
    return (
        <CommentMessageBox key={comment?._id}>
            <CommentMessage>
                <PrfileAvatar >{findUserName(comment?.username)}</PrfileAvatar>
                <MessageBox>
                    <CommentText>{comment?.username}<span>{new Date(comment?.commentDate).toDateString()}</span></CommentText>
                    <CommentText>{comment?.comments}</CommentText>
                </MessageBox>
            </CommentMessage>
            {currentUser === comment?.username &&
                <DeletedIcon onClick={() => deleteComment(comment?._id)} />
            }
        </CommentMessageBox>
    )
};

export default CommentItem