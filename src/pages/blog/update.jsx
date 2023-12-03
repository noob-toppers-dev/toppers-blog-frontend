import React, { useContext, useEffect, useState } from 'react'
import BlogForm from './blog-form'
import { useMutation } from 'react-query';
import { uploadPicture } from '../../helpers';
import { AuthContext } from '../../context';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { TextField } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useCreateBlog, useGetSingleBlog, useUpdateBlog } from '../../query-hooks/blogs/hooks';
import { getUserName } from '../../utils/axios/axios-interceptor';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBlogMutation } from '../../query-hooks/blogs/api';
import Loader from '../../components/loader';


const initialValue = {
    title: "",
    description: "",
    picture: "",
    userName: "",
    createdAt: new Date()
}

const UpdateBlog = () => {



    const [blogValue, setBlogValue] = useState(initialValue);
    const [file, setFile] = useState("");
    const [previewUrl, setPreviewUrl] = useState(false);
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const currentUser = getUserName();
    const navigate = useNavigate();
    const imagePreviewUrl = blogValue?.picture ? blogValue?.picture : 'https://logodix.com/logo/2003981.png'

    const { mutate: uploadPicMutation, isLoading: imageLoading } = useMutation(uploadPicture);

    const { data: singleBlog, isLoading: singleBlogLoading, isError, error } = useGetSingleBlog(id);

    const { mutateAsync: updateBlog, isLoading: updateLoading } = useMutation(updateBlogMutation)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogValue((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { userName, ...rest } = blogValue;
        console.log(blogValue, "blogValue")
        const blog = {
            ...rest,
            username: userName
        };
        try {
            await updateBlog({ id, data: blog });
            // navigate(`/`)
            navigate(`/blog-detail-page/${id}`)

            toast.success('Blog updated successfully!');
        } catch (error) {
            console.error('An error occurred while updating the blog:', error);
            toast.error('An error occurred while updating the blog.');
        }


    }

    useEffect(() => {
        (() => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                uploadPicMutation(data, {
                    onSuccess: (datas) => {
                        setBlogValue((prevValue) => ({
                            ...prevValue,
                            picture: datas,
                        }));
                        setPreviewUrl(true)
                    },
                    onError: (error) => {
                        toast.error(error)
                        console.error('Image upload failed', error);
                    }
                })
            }
        })()
        blogValue.userName = currentUser
    }, [file, auth]);

    useEffect(() => {
        setBlogValue(singleBlog);
        if (singleBlog) {
            setPreviewUrl(true)
        }
    }, [singleBlog])



    if (updateLoading || singleBlogLoading) {
        return <Loader />
    }

    return (
        <>


            <BlogForm
                type="edit"
                blogValue={blogValue}
                handleChange={handleChange}
                onSubmit={handleUpdate}
                setFile={setFile}
                previewUrl={previewUrl}
                imageLoading={imageLoading}
                imagePreviewUrl={imagePreviewUrl}
            />
        </>
    )
}

export default UpdateBlog
