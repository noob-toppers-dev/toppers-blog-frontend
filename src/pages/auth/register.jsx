import React, { useState } from 'react'
import InputField from '../../components/input-field'
import { FormButton, FormContainerStyle, FormControls, FormHeader, FormStyle, } from '../../styled-components'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { isValidEmail, isValidPassword, isValidUserName } from '../../utils/validation'
import { useMutation } from 'react-query'
import ErrorBoundary from '../../components/error-boundary'
import ButtonLoader from '../../components/loader/button-loader'
import { registerUser } from '../../query-hooks/auth/api'

const Register = () => {

    const initialValue = {
        userName: '',
        email: '',
        password: '',
    }
    const [inputValue, setInputValue] = useState(initialValue);
    const [previewUrl, setPreviewUrl] = useState(false);
    const [loginError, setLoginError] = useState(null)

    // console.log(inputValue, "inputValue")
    const navigate = useNavigate();



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








    const handleSubmit = async (e) => {
        e.preventDefault()

        const { userName, password, email } = inputValue;

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
                username: userName,
                email,
                password,
            }

            registerAPIMutation(userData);
        }
    }

    return (
        <FormContainerStyle>
            <FormStyle onSubmit={handleSubmit}>
                <FormHeader>Register Form</FormHeader>

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