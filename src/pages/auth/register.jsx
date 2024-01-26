import React, { useEffect, useState } from 'react'
import InputField from '../../components/input-field'
import { FormButton, FormContainerStyle, FormControls, FormHeader, FormStyle, PictureLabelStyle, PriviewImage } from '../../styled-components'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { isValidEmail, isValidPassword, isValidUserName } from '../../utils/validation'
import { useMutation } from 'react-query'

import Loader from '../../components/loader';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { TextField } from '@mui/material'
import ErrorBoundary from '../../components/error-boundary'
import ButtonLoader from '../../components/loader/button-loader'
import { registerUser } from '../../query-hooks/auth/api'
import { uploadPicture } from '../../helpers'

const Register = () => {

    const initialValue = {
        userName: '',
        email: '',
        password: '',
        profile: ''
    }
    const [inputValue, setInputValue] = useState(initialValue);
    const [previewUrl, setPreviewUrl] = useState(false);
    const [file, setFile] = useState("");
    const [loginError, setLoginError] = useState(null)

    const imagePreviewUrl = inputValue?.picture ? inputValue?.picture : 'https://logodix.com/logo/2003981.png'
    // console.log(inputValue, "inputValue")
    const navigate = useNavigate();

    const { mutate: uploadPicMutation, isLoading: imageLoading } = useMutation(uploadPicture, {
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.log(error, "upload  error")
        }
    });

    const { mutate: registerAPIMutation, isLoading, isError } = useMutation(registerUser, {
        onSuccess: (data) => {
            if (data.status === 200 || 201) {
                toast.success(data.data.message);
                navigate('/login');
            }
        },
        onError: (error) => {
            setLoginError(error?.response?.message)
            console.log(error, "regiter error", error?.response.data?.message)
        }
    })



    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValue((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }



    useEffect(() => {
        (async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                await uploadPicMutation(data, {
                    onSuccess: (datas) => {
                        setInputValue((prevValue) => ({
                            ...prevValue,
                            profile: datas,
                        }));
                        setPreviewUrl(true)
                    },
                    onError: (error) => {
                        toast.error(error)
                        console.error('Profile upload failed', error);
                    }
                })
            }
        })()
    }, [file]);




    const handleSubmit = async (e) => {
        e.preventDefault()

        const { userName, password, email, profile } = inputValue;

        if (!email || !userName || !password) {
            toast.error('Please enter username,email and password')
            return;
        }
        const usernameValidationResult = isValidUserName(userName);
        if (usernameValidationResult !== true) {
            toast.error(usernameValidationResult);
            return;
        }
        if (!isValidEmail(email)) {
            toast.error('Email Id is not valid.');
            return;
        }

        const passwordValidationResult = isValidPassword(password);
        if (passwordValidationResult !== true) {
            toast.error(passwordValidationResult);
            return;
        }
        if (email && userName && password) {

            const userData = {
                username: inputValue.userName,
                email,
                password,
                profile
            }

            registerAPIMutation(userData);
        }
    }

    return (
        <FormContainerStyle>
            <FormStyle onSubmit={handleSubmit}>
                <FormHeader>Register Form</FormHeader>
                <PictureLabelStyle htmlFor='picture'  >
                    {imageLoading ? <Loader /> : previewUrl && <PriviewImage src={imagePreviewUrl} alt="Preview" />}
                    <FileUploadIcon /> <span>Profile Upload</span>
                </PictureLabelStyle>
                <TextField
                    id='picture'
                    type={'file'}
                    name='file'
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}

                />
                <FormControls>
                    <InputField
                        type={'text'}
                        placeholder={'Enter your username'}
                        name='userName'
                        value={inputValue.userName}
                        onChange={handleChange}
                    />
                </FormControls>
                <FormControls>

                    <InputField
                        type={'text'}
                        placeholder={'Enter your email'}
                        name='email'
                        value={inputValue.email}
                        onChange={handleChange}
                    />
                </FormControls>
                <FormControls>

                    <InputField
                        type={'password'}
                        placeholder={'Enter your password'}
                        name='password'
                        value={inputValue.password}
                        onChange={handleChange}
                    />
                </FormControls>
                <ErrorBoundary error={loginError} status={isError}>
                    {loginError}
                </ErrorBoundary>
                <FormControls className='t-center'>
                    <FormButton type='submit' >{isLoading ? <ButtonLoader /> : 'Submit'}</FormButton>
                </FormControls>
            </FormStyle>
        </FormContainerStyle>
    )
}

export default Register