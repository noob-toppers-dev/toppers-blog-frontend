import React, { useContext } from 'react'
import styled from 'styled-components';
import { useGetAllBlogs, useGetSavedBlog } from '../../query-hooks/blogs/hooks';
import { elipsisText } from '../../utils/axios/axios-interceptor';
import Loader from '../../components/loader';
import { currentUserApp } from '../../utils/common';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../context';
import DialogBox from '../../components/diaog-box/dialog-box';


const BlogListContainer = styled.div`
max-width: 720px;
width: 100%;
margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BlogItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
    margin-bottom: 10px;
    background: #F9F9F9;
    border-radius: 4px;
`;

const BlogImage = styled.img`
  max-width: 100px;
  /* Add additional styling for the blog image if needed */
`;

const BlogInfo = styled.div`
  flex: 1;
`;

const BlogTitle = styled.h2`
  font-size: 1.2rem;
`;

const BlogDescription = styled.p`

`;

const ActionButton = styled.div`
`;

const DotsButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`
const SavedBlogs = () => {
  const { data: blogList, isLoading, isError, error, isSuccess } = useGetAllBlogs();
  const currentUser = currentUserApp ? currentUserApp() : {};
  const { cardActionModal, handleCardAction, handleCardCloseAction } = useContext(AuthContext);

  const { data: getSaveBlog, isLoading: savedBlogLoading } = useGetSavedBlog(currentUser?._id);
  console.log(currentUser, "currentUser")
  console.log(getSaveBlog, "getSaveBlog")

  if (savedBlogLoading) {
    return <Loader />
  }
  return (
    <BlogListContainer>
      {getSaveBlog?.savedBlogs.map((blog, index) => (
        <BlogItem key={index}>
          <BlogImage src={blog.picture} alt={blog.title} />
          <BlogInfo>
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogDescription>{elipsisText(blog.description, 90)}</BlogDescription>
          </BlogInfo>
          <ActionButton>
            <DotsButton>
              <IconButton aria-label="settings">
                <MoreVertIcon className='cursor-p' onClick={() => handleCardAction(blog?._id)} />
              </IconButton>
            </DotsButton>
            {cardActionModal === blog?._id ?
              <DialogBox
                blogUser={currentUser?.username}
                blogId={cardActionModal}
                onClose={handleCardCloseAction}
              />
              : null}
          </ActionButton>
        </BlogItem>
      ))}
    </BlogListContainer>
  )
}

export default SavedBlogs