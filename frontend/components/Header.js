import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import AuthContext from '@/contexts/AuthContext'

const Header = () => {
    const {user, logout} = useContext(AuthContext)
console.log(user)
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/">
                <h5>Events Around You</h5>
            </Link>
        </div>
        <Search />
        <nav>
            <ul>
                <Link href="/events">
                    <p>Events</p>
                </Link>
                {user ? 
                <>
                 <Link href="/events/add">
                    <p>Add Event</p>
                </Link>
                <Link href="/account/dashboard">
                    <p>Dashboard</p>
                </Link>
                <button className='btn-icon btn-secondary' onClick={() => logout()}>
                    <FaSignOutAlt/> Logout
                </button>
                </>
                :
                <Link href="/account/login">
                    <button className='btn-icon btn-secondary'>
                        <FaSignInAlt/> Login
                    </button>
                </Link>
                }
            </ul>
            
        </nav>
    </header>
  )
}

export default Header