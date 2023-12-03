// useCreateBlog.js
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addCommentMutation, checkLikeBlogQuery, createBlogMutation, deleteCommentMutation, disLikeBlogMutation, followUserMutation, getAllBlogQuery, getCommentQuery, getSavedBlogQuery, getSingleBlogQuery, likeBlogMutation, savedBlogMutation, unFollowUserMutation } from '../api';

export const useCreateBlog = (onSuccess) => {
    return useMutation(createBlogMutation, {
        onSuccess: onSuccess
    })
};


export const useGetAllBlogs = () => {
    return useQuery(['get-all-blog'], getAllBlogQuery);
};


// useGetSingleBlog

export const useGetSingleBlog = (id) => {
    const queryClient = useQueryClient();
    return useQuery(['get-single-blog', id], () => getSingleBlogQuery(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog')
        }
    })
}

// add comment
export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation(addCommentMutation, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-comment');
        }
    })
};

export const useGetSingleComment = (id) => {
    return useQuery(['single-comment', id], () => getCommentQuery(id), {
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    })
}


// delete comment
export function useDeleteComment() {
    const queryClient = useQueryClient();

    const deleteComment = useMutation(
        ({ id }) => deleteCommentMutation({ id }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('comments/delete-comment');
            },
        }
    );

    return deleteComment;
}


// blog like 

export function useLikeBlog() {
    const queryClient = useQueryClient();
    const likeBlogMutationFunction = ({ blogId, userId }) => likeBlogMutation({ blogId, userId });
    const likeBlog = useMutation(likeBlogMutationFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog');
        }
    }
    );

    return likeBlog;
}

//blog dislike
export function useDisLikeBlog() {
    const queryClient = useQueryClient();
    const disLikeBlogMutationFunction = ({ blogId, userId }) => disLikeBlogMutation({ blogId, userId });
    const disLikeBlog = useMutation(disLikeBlogMutationFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog');
        }
    }
    );

    return disLikeBlog;
}


export function useUserFollower() {

    const queryClient = useQueryClient();
    const followMutationFunction = ({ username }) => followUserMutation({ username });
    const followUser = useMutation(followMutationFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog');
        }
    }
    );

    return followUser;
}
export function useUserUnFollower() {

    const queryClient = useQueryClient();
    const unfollowMutationFunction = ({ username }) => unFollowUserMutation({ username });
    const unfollowUser = useMutation(unfollowMutationFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog');
        }
    }
    );

    return unfollowUser;
}



// add comment
export const useSavedBlog = () => {
    const queryClient = useQueryClient();

    const savedBlogMutationFunction = ({ blogId, userId }) => savedBlogMutation({ blogId, userId });
    const savedBlog = useMutation(savedBlogMutationFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog');
        }
    }
    );

    return savedBlog;
}


// get saved blog by userId

// useGetSingleBlog

export const useGetSavedBlog = (userId) => {
    const queryClient = useQueryClient();
    return useQuery(['get-saved-blog', userId], () => getSavedBlogQuery(userId), {
        onSuccess: () => {
            queryClient.invalidateQueries('get-all-blog')
        }
    })
}