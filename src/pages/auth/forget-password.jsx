import React, { useState } from 'react'
import InputField from '../../components/input-field'
import { FooterLogin, FormButton, FormContainerStyle, FormControls, FormHeader, FormStyle } from '../../styled-components'
import { NavLink } from 'react-router-dom'
import ButtonLoader from '../../components/loader/button-loader'
import { useForgetPassword } from '../../query-hooks/auth/hooks'
import toast from 'react-hot-toast'
import { isValidEmail } from '../../utils/validation'

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const { mutate: forgotPasswordAPI, isLoading: forgetLoading, data } = useForgetPassword();
    // console.log(data, "forget data")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter email')
            return;
        }

        if (!isValidEmail(email)) {
            toast.error('Email Id is not valid.');
            return;
        }
        if (email) {
            forgotPasswordAPI(email)
        }
    }
    return (
        <FormContainerStyle>
            <FormStyle onSubmit={handleSubmit}>
                <FormHeader>Forget Password</FormHeader>
                <FormControls>

                    <InputField
                        type={'text'}
                        placeholder={'Enter your email'}
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControls>
                {/* <ErrorBoundary error={loginError} status={isError} /> */}
                <FormControls className='t-center'>
                    <FormButton style={{ background: forgetLoading ? '#ffae33' : '' }} type='submit' >{forgetLoading ? <ButtonLoader title='login...' /> : 'Submit'}</FormButton>
                </FormControls>
                {/* <FooterLogin>
                    <NavLink to="/register" >Resend ?</NavLink>
                </FooterLogin> */}
            </FormStyle>
        </FormContainerStyle>
    )
}

export default ForgetPassword