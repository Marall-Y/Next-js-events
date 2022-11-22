import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

const EventPage = ({event}) => {
  return (
    <Layout>
      <h1>{event.name}</h1>
    </Layout>
  )
}

export async function getStaticPaths() {
  const response = await fetch(`${API_URL}/api/events/`)
  const events = await response.json()
  const paths = events.map((evt) => {return {params: {slug: evt.slug}}})

  return{
    paths,
    fallback: true
  }
}

export async function getStaticProps({params: {slug}}) {
  const response = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await response.json()

  return{
    props: {event : events[0]},
    revalidate: 1
  }
}

export default EventPage