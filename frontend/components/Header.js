import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'

const Header = () => {
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
                <Link href="/events/add">
                    <p>Add Event</p>
                </Link>
            </ul>
            
        </nav>
    </header>
  )
}

export default Header