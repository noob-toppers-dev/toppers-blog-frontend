import axiosInstance from "../../../utils/axios/axios-interceptor";

export const createBlogMutation = async (blogData) => {
    try {
        const resp = await axiosInstance.post("blogs/create-blog", blogData);
        return resp.data;
    } catch (error) {
        throw new Error("Blogg upload failed!")
    }
};

export const getAllBlogQuery = async () => {
    try {
        const resp = await axiosInstance.get("blogs/get-all-blog")
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while fetching all blogs!!")
    }
}
export const getSingleBlogQuery = async (id) => {
    try {
        const resp = await axiosInstance.get(`blogs/get-single-blog/${id}`)
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while fetching single blog!!")
    }
}
export const updateBlogMutation = async ({ id, data }) => {
    try {
        const resp = await axiosInstance.put(`blogs/update-blog/${id}`, data)
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while updating  blog!!")
    }
}
export const deleteBlogMutation = async ({ id }) => {
    try {
        const resp = await axiosInstance.delete(`blogs/delete-blog/${id}`)
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while deleting  blog!!")
    }
}


export const addCommentMutation = async (comment) => {
    try {
        const resp = await axiosInstance.post("comments/add-comment", comment);
        return resp.data;
    } catch (error) {
        throw new Error("Comment add failed!")
    }
};
export const getAllCommentQuery = async () => {
    try {
        const resp = await axiosInstance.get("comments/get-all-comment")
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while fetching all comment!!")
    }
}
export const getCommentQuery = async ({ id }) => {
    try {
        const resp = await axiosInstance.get(`comments/get-comment/${id}`)
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while fetching all comment!!")
    }
}

export const deleteCommentMutation = async ({ id }) => {
    try {
        const resp = await axiosInstance.delete(`comments/delete-comment/${id}`)
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while deleting  comment!!")
    }
}


export const likeBlogMutation = async ({ blogId, userId }) => {
    try {
        const resp = await axiosInstance.put(`likes/like-blog/${blogId}`, { userId })
        return resp.data;
    } catch (error) {
        throw new Error(error.message)

    }
}
export const disLikeBlogMutation = async ({ blogId, userId }) => {
    try {
        const resp = await axiosInstance.put(`likes/dislike-blog/${blogId}`, { userId })
        return resp.data;
    } catch (error) {
        throw new Error(error.message)

    }
}


export const followUserMutation = async ({ username }) => {
    try {
        const resp = await axiosInstance.put(`followers/follow-user/${username}`)
        return resp.data;
    } catch (error) {
        throw new Error(error.message)

    }
}

export const unFollowUserMutation = async ({ username }) => {
    try {
        const resp = await axiosInstance.put(`followers/unfollow-user/${username}`)
        return resp.data;
    } catch (error) {
        throw new Error(error.message)

    }
}


export const savedBlogMutation = async ({ blogId, userId }) => {
    try {
        const resp = await axiosInstance.post(`blogs/saved-blog/${blogId}`, { userId });
        return resp.data;
    } catch (error) {
        throw new Error("saving blog failed!")
    }
};


// get saved blog by user id

export const getSavedBlogQuery = async (userId) => {
    try {
        const resp = await axiosInstance.get(`blogs/get-saved-blog/${userId}`)
        return resp.data;
    } catch (error) {
        throw new Error("Something went wrong while fetching saved blog!!")
    }
}