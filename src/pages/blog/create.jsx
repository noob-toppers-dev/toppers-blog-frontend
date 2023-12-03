import React, { useContext, useEffect, useState } from 'react'
import BlogForm from './blog-form'
import { useMutation, useQueryClient } from 'react-query';
import { uploadPicture } from '../../helpers';
import { AuthContext } from '../../context';
import { toast } from 'react-hot-toast';
import { useCreateBlog } from '../../query-hooks/blogs/hooks';
import { getUserName } from '../../utils/axios/axios-interceptor';
import { useNavigate } from 'react-router-dom';


const initialValue = {
    title: "",
    description: "",
    category: "",
    picture: "",
    userName: "",
    createdAt: new Date()
}

const CreateBlog = () => {



    const [blogValue, setBlogValue] = useState(initialValue);
    const [file, setFile] = useState("");
    const [previewUrl, setPreviewUrl] = useState(false);
    const { auth } = useContext(AuthContext);
    const currentUser = getUserName();
    const navigate = useNavigate();
    const imagePreviewUrl = blogValue.picture ? blogValue?.picture : 'https://logodix.com/logo/2003981.png'

    const { mutate: uploadPicMutation, isLoading: imageLoading } = useMutation(uploadPicture);
    const queryClient = useQueryClient();

    const onSuccess = (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries('get-all-blog');
    }

    const { mutate: createBlog, isLoading: blogLoading, error, isSuccess } = useCreateBlog(onSuccess)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogValue((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { userName, ...rest } = blogValue;
        if (!userName || !blogValue?.title || !blogValue.description || blogValue.title.trim() === "" || blogValue.description.trim() === "") {
            toast.error('Please enter title and description')
            return;
        }

        const blog = {
            ...rest,
            username: userName
        };

        createBlog(blog);
        navigate('/welcome-page')

    }

    // console.log(file, "pic")
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

    console.log(blogValue, "blogValue")



    if (blogLoading) {
        return
    }

    return (
        <>
            <BlogForm
                type="create"
                blogValue={blogValue}
                handleChange={handleChange}
                onSubmit={handleSubmit}
                setFile={setFile}
                imageLoading={imageLoading}
                previewUrl={previewUrl}
                imagePreviewUrl={imagePreviewUrl}
            />
        </>
    )
}

export default CreateBlog
