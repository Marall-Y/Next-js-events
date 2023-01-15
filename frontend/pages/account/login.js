import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/AuthForm.module.css'
import Layout from '@/components/Layout'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import AuthContext from '@/contexts/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const {login, error} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()
        login({email, password})
    }

    return (
    <Layout title="User Login">
        <div className={styles.auth}>
            <h1>
            <FaUser /> Log In
            <ToastContainer />
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input type='submit' value='Login' className='btn' />
            </form>
            <p>
                Don't have an account? <Link href='/account/register'>Register</Link>
            </p>
        </div>
    </Layout>
  )
}

export default LoginPage