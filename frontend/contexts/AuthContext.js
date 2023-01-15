import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { NEXT_URL } from "../config";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        checkLoggedIn()
    },[])

    const register = async(user) => {
        console.log(user)
    }

    const login = async({email: identifier, password}) => {
        const response = await fetch (`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({identifier, password})
        })

        const data = await response.json()
        if (response.ok){
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
        }
    }

    const logout = async(user) => {
        console.log('Logout')
    }

    const checkLoggedIn = async(user) => {
        const request = await fetch (`${NEXT_URL}/api/user`)
        const response = await request.json()
        
        if (request.ok){
            setUser(response.user)
        }else {
            setUser(null)
        }
    }

    return(
    <AuthContext.Provider value={{user, error, register, login, logout}}>
        {children}
    </AuthContext.Provider>
    ) 
}

export default AuthContext