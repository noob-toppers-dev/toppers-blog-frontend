// import React from 'react'
// import { FormButton, FormContainerStyle, FormControls, FormHeader, FormStyle } from '../../styled-components'
import React, { useContext, useState } from 'react'
import InputField from '../../components/input-field'
import { EyeIcon, FooterLogin, FormButton, FormContainerStyle, FormControls, FormHeader, FormStyle } from '../../styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { isValidEmail, isValidPassword } from '../../utils/validation'
import { useMutation } from 'react-query'
import { AuthContext } from '../../context'
import Loader from '../../components/loader'
import ErrorBoundary from '../../components/error-boundary'
import { setExpireTime, setTokens, setUserDetail } from '../../utils/axios/axios-interceptor'
import ButtonLoader from '../../components/loader/button-loader'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Visibility } from '@mui/icons-material'
import { loginUser } from '../../query-hooks/auth/api'
const Login = ({ setIsAuth }) => {
    const initialValue = {
        email: '',
        password: ''
    }
    const [loginError, setLoginError] = useState(null)
    const [hideShow, setHideShow] = useState(false)
    const { setAuth } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState(initialValue);
    const navigate = useNavigate();
    const { mutate: loginAPI, isLoading, isError } = useMutation(loginUser, {
        onSuccess: (data) => {
            if (data.status === 200) {
                const { user, accessToken, refreshToken, accessTokenExpiry, message } = data?.data;
                setIsAuth(true);
                setAuth({ email: user?.email, name: user?.username, profile: user?.profile, followers: user?.followers, following: user?.following, blogs: user?.blogs });
                setTokens(accessToken, refreshToken);
                setUserDetail(user)
                toast.success(data.data.message);
                navigate('/welcome-page');
            }
        },
        onError: (error) => {
            setLoginError(error?.response.data?.message);
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



    const handleSubmit = (e) => {
        e.preventDefault()
        const { password, email } = inputValue;
        const passwordValidationResult = isValidPassword(password);

        if (!email || !password) {
            toast.error('Please enter username,email and password')
            return;
        }

        if (!isValidEmail(email)) {
            toast.error('Email Id is not valid.');
            return;
        }


        if (passwordValidationResult !== true) {
            toast.error(passwordValidationResult);
            return;
        }
        if (email && password) {
            loginAPI(inputValue);
        }
    }

    // if(isLoading){
    //     return <Loader />
    // }

    return (
        <FormContainerStyle>
            <FormStyle onSubmit={handleSubmit}>
                <FormHeader>Login Form</FormHeader>
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
                        type={!hideShow ? 'password' : 'text'}
                        placeholder={'Enter your password'}
                        name='password'
                        value={inputValue.password}
                        onChange={handleChange}
                    />
                    <EyeIcon onClick={() => setHideShow(!hideShow)}>
                        {!hideShow ?
                            <VisibilityOffIcon />
                            : <Visibility />
                        }
                    </EyeIcon>
                </FormControls>
                <ErrorBoundary error={loginError} status={isError} />
                <FormControls className='t-center'>
                    <FormButton style={{ background: isLoading ? '#ffae33' : '' }} type='submit' >{isLoading ? <ButtonLoader title='login...' /> : 'Submit'}</FormButton>
                </FormControls>
                <FooterLogin>
                    <NavLink to="/register" >Register Now</NavLink>
                    <NavLink to="/forget-password" >Forgot Password?</NavLink>
                </FooterLogin>
            </FormStyle>
        </FormContainerStyle>
    )
}

export default Login