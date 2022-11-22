import Link from 'next/link'
import styles from '@/styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/">
                <h5>Events Around You</h5>
            </Link>
        </div>
        <nav>
            <ul>
                <Link href="/events">
                    <p>Events</p>
                </Link>
            </ul>
        </nav>
    </header>
  )
}

export default Header