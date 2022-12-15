import React, { useState} from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Search.module.css'

const Search = () => {
    const [term,setTerm] = useState(null)
    const router = useRouter()
    const onSubmitHandler = (e) => {
        e.preventDefault()
        router.push(`/events/search?term=${term}`)
        setTerm(null)
    }

    return (
        <div className={styles.search}>
            <form onSubmit={onSubmitHandler}>
                <input type='text' value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search"/>
            </form>
        </div>
    )
}

export default Search