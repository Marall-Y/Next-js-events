import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Image from "next/image"
import Link from "next/link"

const EventPage = ({event}) => {
  console.log(event)
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.attributes.date).toLocaleDateString('en-US')}at {event.attributes.time}
        </span>
        <h1>{event.attributes.name}</h1>
        {event.attributes.image && (
          <div className={styles.image}>
            <Image
              src={event.attributes.image.data?.attributes.formats.medium.url ?? '/images/event-default.png'}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{event.attributes.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.attributes.address}</p>


        <Link href='/events'>
          <button className={`${styles.back} btn-secondary`}>{'<'} Go Back</button>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const response = await fetch(`${API_URL}/api/events`)
  const events = await response.json()
  const paths = events.data.map((evt) => {return {params: {slug: evt.attributes.slug}}})
  
  return{
    paths,
    fallback: true
  }
}

export async function getStaticProps({params: {slug}}) {
  const response = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`)
  console.log(response)
  const events = await response.json()

  return{
    props: {event: events.data[0]},
    revalidate: 1
  }
}

export default EventPage