import styles from '@/styles/EventItem.module.css'
import Image from 'next/image'
import Link from 'next/link'

const EventItem = ({event}) => {
  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image
             src={event.image.data?.attributes?.formats.thumbnail.url?? '/images/event-default.png'}
             width={170}
             height={100}
             />
        </div>
        <div className={styles.info}>
            <span>
                {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
            </span>
            <h3>{event.name}</h3>
        </div>
        <div className={styles.link}>
            <Link href={`/events/${event.slug}`}>
                <button className='btn'>Details</button>
            </Link>
        </div>
    </div>
  )
}

export default EventItem