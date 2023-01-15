import Link from 'next/link'
import { PER_PAGE } from '@/config/index'

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE)
  console.log(PER_PAGE)

  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <button className='btn-secondary'>Prev</button>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <button className='btn-secondary'>Next</button>
        </Link>
      )}
    </>
  )
}