import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length > 0 ?
        events.map((evt) => {
          return <EventItem key={evt.id} event={evt}/>
        }) 
        :
        <h3>No events to show</h3>
      }
      {events.length > 0 &&
        <Link href={'/events'}>
          <button className="btn-secondary">View All Events</button>
        </Link>
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events : events.slice(0,3)},
    revalidate: 1
  }
}
